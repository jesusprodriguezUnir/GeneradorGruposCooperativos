import { Student, Constraint, Group } from '../types';

export class GroupGenerator {
  private students: Student[];
  private constraints: Constraint[];
  private leaders: Student[];
  private groupSize: number;
  private maxAttempts = 1000;
  private static readonly DEFAULT_GROUP_SIZE = 4;

  constructor(students: Student[], constraints: Constraint[], groupSize: number = 4) {
    this.students = students;
    this.constraints = constraints.filter(c => c.enabled);
    this.leaders = students.filter(s => s.isLeader);
    
    // Validate and normalize groupSize to avoid invalid values (0, negative, non-integer, or > number of students)
    const totalStudents = this.students.length;
    let normalizedGroupSize = Number.isFinite(groupSize) ? Math.floor(groupSize) : GroupGenerator.DEFAULT_GROUP_SIZE;

    if (normalizedGroupSize < 1) {
      // Ensure at least one student per group when there are students; default to 1 otherwise
      normalizedGroupSize = totalStudents > 0 ? Math.min(GroupGenerator.DEFAULT_GROUP_SIZE, totalStudents) : 1;
    } else if (totalStudents > 0 && normalizedGroupSize > totalStudents) {
      // Do not allow groupSize to exceed the total number of students
      normalizedGroupSize = totalStudents;
    }

    this.groupSize = normalizedGroupSize;
  }

  generateGroups(): Group[] | null {
    for (let attempt = 0; attempt < this.maxAttempts; attempt++) {
      const groups = this.attemptGeneration();
      if (groups && this.validateGroups(groups)) {
        return groups;
      }
    }
    return null;
  }

  private attemptGeneration(): Group[] {
    const numGroups = Math.ceil(this.students.length / this.groupSize);
    
    // Inicializar grupos
    const groups: Group[] = Array.from({ length: numGroups }, (_, i) => ({
      id: i + 1,
      students: []
    }));

    // Paso 1: Asignar líderes a cada grupo
    // Nota: Si hay más grupos que líderes disponibles, solo los primeros grupos tendrán líder.
    // Por ejemplo, con 24 estudiantes y groupSize=2, habrá 12 grupos pero solo 6 líderes,
    // lo que resultará en que solo la mitad de los grupos tengan líder asignado.
    const shuffledLeaders = [...this.leaders].sort(() => Math.random() - 0.5);
    shuffledLeaders.forEach((leader, index) => {
      if (index < numGroups) {
        groups[index].students.push(leader);
      }
    });

    // Paso 2: Crear lista de estudiantes restantes
    const remainingStudents = this.students.filter(s => !s.isLeader);
    const shuffledRemaining = [...remainingStudents].sort(() => Math.random() - 0.5);

    // Paso 3: Asignar estudiantes restantes
    for (const student of shuffledRemaining) {
      const bestGroup = this.findBestGroupForStudent(student, groups);
      if (bestGroup && bestGroup.students.length < this.groupSize) {
        bestGroup.students.push(student);
      } else {
        // Si no se puede asignar, devolver null para intentar de nuevo
        return groups;
      }
    }

    return groups;
  }

  private findBestGroupForStudent(student: Student, groups: Group[]): Group | null {
    // Encontrar grupos válidos (que no violen restricciones)
    const validGroups = groups.filter(group => 
      group.students.length < this.groupSize && this.canAddStudentToGroup(student, group, groups)
    );

    if (validGroups.length === 0) return null;

    // Priorizar grupos que satisfagan preferencias
    let bestScore = -1;
    let bestGroup: Group | null = null;

    for (const group of validGroups) {
      let score = 0;
      
      // Puntos por preferencias satisfechas
      for (const preference of student.preferences) {
        if (group.students.some(s => s.id === preference)) {
          score += 10;
        }
      }

      // Puntos por tener un líder (especialmente importante para Erik, Luis Angel, Cristian)
      if (group.students.some(s => s.isLeader)) {
        score += 5;
      }

      // Puntos por equilibrio de género
      const boys = group.students.filter(s => s.gender === 'male').length;
      const girls = group.students.filter(s => s.gender === 'female').length;
      if (Math.abs(boys - girls) < 2) {
        score += 3;
      }

      if (score > bestScore) {
        bestScore = score;
        bestGroup = group;
      }
    }

    return bestGroup || validGroups[0];
  }

  private canAddStudentToGroup(student: Student, group: Group, allGroups: Group[]): boolean {
    const futureGroup = [...group.students, student];

    for (const constraint of this.constraints) {
      if (!this.checkConstraint(constraint, futureGroup, allGroups, student)) {
        return false;
      }
    }

    return true;
  }

  private checkConstraint(constraint: Constraint, group: Student[], allGroups: Group[], newStudent?: Student): boolean {
    switch (constraint.type) {
      case 'cannot_be_together':
        const conflictCount = group.filter(s => constraint.students.includes(s.id)).length;
        return conflictCount <= 1; // Máximo uno de los estudiantes problemáticos por grupo

      case 'must_be_together':
        if (constraint.students.length === 2) {
          const [id1, id2] = constraint.students;
          const has1 = group.some(s => s.id === id1);
          const has2 = group.some(s => s.id === id2);
          // Si uno está presente, el otro también debe estar o poder estar
          if (has1 && !has2) {
            return group.length < this.groupSize; // Aún hay espacio para el segundo
          }
          if (has2 && !has1) {
            return group.length < this.groupSize; // Aún hay espacio para el primero
          }
        }
        return true;

      case 'separate_leaders':
        const leadersInGroup = group.filter(s => constraint.students.includes(s.id)).length;
        return leadersInGroup <= 1;

      case 'separate_help':
        const helpersInGroup = group.filter(s => constraint.students.includes(s.id)).length;
        return helpersInGroup <= 1;

      case 'max_boys_with_student':
        if (constraint.targetStudent && group.some(s => s.id === constraint.targetStudent)) {
          const boys = group.filter(s => s.gender === 'male').length;
          return boys <= (constraint.maxBoys || 1);
        }
        return true;

      case 'exclude_combination':
        const excludedCount = group.filter(s => constraint.students.includes(s.id)).length;
        return excludedCount <= 1;

      default:
        return true;
    }
  }

  private validateGroups(groups: Group[]): boolean {
    const totalStudents = this.students.length;
    
    // Verificar que todos los grupos tengan el tamaño correcto (o menos si no es divisible)
    if (groups.some(g => g.students.length > this.groupSize)) {
      return false;
    }

    // Verificar que se hayan asignado todos los estudiantes
    const assignedCount = groups.reduce((acc, g) => acc + g.students.length, 0);
    if (assignedCount !== totalStudents) {
      return false;
    }

    // Verificar que los grupos tengan tamaños balanceados:
    // cada grupo debe tener un tamaño entre floor(total / #grupos) y ceil(total / #grupos),
    // de forma que la diferencia máxima entre grupos sea de 1 estudiante.
    if (groups.length === 0) {
      // Si no hay grupos, solo es válido si tampoco hay estudiantes.
      return totalStudents === 0;
    }
    const minGroupSize = Math.floor(totalStudents / groups.length);
    const maxGroupSize = Math.ceil(totalStudents / groups.length);
    if (groups.some(g => g.students.length < minGroupSize || g.students.length > maxGroupSize)) {
      return false;
    }

    // Verificar que se cumplan todas las restricciones
    for (const constraint of this.constraints) {
      if (!this.validateConstraintAcrossGroups(constraint, groups)) {
        return false;
      }
    }

    return true;
  }

  private validateConstraintAcrossGroups(constraint: Constraint, groups: Group[]): boolean {
    switch (constraint.type) {
      case 'must_be_together':
        if (constraint.students.length === 2) {
          const [id1, id2] = constraint.students;
          const group1 = groups.find(g => g.students.some(s => s.id === id1));
          const group2 = groups.find(g => g.students.some(s => s.id === id2));
          return group1 === group2; // Deben estar en el mismo grupo
        }
        return true;

      case 'separate_leaders':
      case 'separate_help':
        // Verificar que cada estudiante especial esté en un grupo diferente
        const studentGroups = new Set();
        for (const studentId of constraint.students) {
          const group = groups.find(g => g.students.some(s => s.id === studentId));
          if (group && studentGroups.has(group.id)) {
            return false; // Dos estudiantes especiales en el mismo grupo
          }
          if (group) {
            studentGroups.add(group.id);
          }
        }
        return true;

      default:
        // Para otras restricciones, verificar grupo por grupo
        return groups.every(group => 
          this.checkConstraint(constraint, group.students, groups)
        );
    }
  }
}