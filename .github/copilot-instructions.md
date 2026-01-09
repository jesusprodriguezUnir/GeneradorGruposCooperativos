# Generador de Grupos Cooperativos - AI Instructions

## Stack Tecnológico
- **Frontend**: React 18 (TypeScript), Vite, Tailwind CSS.
- **Iconos**: Lucide React.
- **Testing**: Jest con React Testing Library.
- **Base de Datos (Pendiente)**: Supabase (instalado pero no configurado para persistencia).

## Arquitectura y Flujo de Datos
- **Lógica de Generación**: Centralizada en [src/utils/groupGenerator.ts](/src/utils/groupGenerator.ts). Utiliza un algoritmo iterativo (máx 1000 intentos) para encontrar una combinación que satisfaga todas las restricciones activas.
- **Estado de la Aplicación**: Gestionado localmente en [src/App.tsx](/src/App.tsx).
- **Persistencia Actual**: Exportación/Importación manual mediante archivos JSON.
- **Tipos Globales**: Definidos en [src/types/index.ts](/src/types/index.ts).

## Convenciones de Desarrollo
- **Tamaño de Grupos**: Dinámico. El tamaño de grupo puede ser de 4 estudiantes o parejas de 2 estudiantes, seleccionado por el usuario al momento de generar los grupos. El sistema calcula el número de grupos necesario automáticamente.
- **Restricciones**: Las restricciones se evalúan mediante `checkConstraint` en el generador. Cada restricción tiene un `type` que mapea a una lógica específica.
- **Componentes**: Estilos con Tailwind de forma inline. Uso intensivo de gradientes y animaciones personalizadas (definidas en [src/index.css](/src/index.css)).

## Comandos Críticos
- `npm run dev`: Iniciar entorno de desarrollo.
- `npm run test`: Ejecutar tests unitarios con Jest.

## Notas de Implementación
- Al añadir nuevas restricciones en `initialData.ts`, asegúrate de actualizar la lógica correspondiente en el método `checkConstraint` de `GroupGenerator`.
- Los líderes se distribuyen equitativamente entre los primeros grupos disponibles.
- Las preferencias de los estudiantes (`preferences`) actúan como un sistema de puntuación para elegir el mejor grupo, no como restricciones estrictas.
