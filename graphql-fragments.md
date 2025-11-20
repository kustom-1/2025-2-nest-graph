# GraphQL Fragments

Los fragments permiten reutilizar partes comunes de queries y mutations en GraphQL.

## Student Fragments

### StudentBasicInfo
```graphql
fragment StudentBasicInfo on Student {
  id
  name
  email
  gender
}
```

### StudentFullInfo
```graphql
fragment StudentFullInfo on Student {
  id
  name
  email
  gender
  age
  nickname
  subjects
}
```

### StudentWithGrades
```graphql
fragment StudentWithGrades on Student {
  id
  name
  email
  gender
  age
  nickname
  subjects
  grade {
    id
    subject
    grade
  }
}
```

## User Fragments

### UserBasicInfo
```graphql
fragment UserBasicInfo on User {
  id
  email
  fullName
}
```

### UserFullInfo
```graphql
fragment UserFullInfo on User {
  id
  email
  fullName
  isActive
  roles
}
```

## Grade Fragment

### GradeInfo
```graphql
fragment GradeInfo on Grade {
  id
  subject
  grade
}
```

## Uso de Fragments

### Ejemplo 1: Query con Fragment Simple
```graphql
query GetStudents {
  students {
    ...StudentBasicInfo
  }
}

fragment StudentBasicInfo on Student {
  id
  name
  email
  gender
}
```

### Ejemplo 2: Query con Fragments Anidados
```graphql
query GetStudent($term: String!) {
  student(term: $term) {
    ...StudentWithGrades
  }
}

fragment StudentWithGrades on Student {
  ...StudentFullInfo
  grade {
    ...GradeInfo
  }
}

fragment StudentFullInfo on Student {
  id
  name
  email
  gender
  age
  nickname
  subjects
}

fragment GradeInfo on Grade {
  id
  subject
  grade
}
```

### Ejemplo 3: Mutation con Fragment
```graphql
mutation CreateStudent($input: CreateStudentInput!) {
  createStudent(createStudentInput: $input) {
    ...StudentWithGrades
  }
}

fragment StudentWithGrades on Student {
  id
  name
  email
  gender
  age
  nickname
  subjects
  grade {
    id
    subject
    grade
  }
}
```

### Ejemplo 4: Query de Autenticación con Fragment
```graphql
query Me {
  me {
    ...UserFullInfo
  }
}

fragment UserFullInfo on User {
  id
  email
  fullName
  isActive
  roles
}
```

### Ejemplo 5: Mutation de Login con Fragment
```graphql
mutation Login($input: LoginInput!) {
  login(loginInput: $input) {
    token
    user {
      ...UserFullInfo
    }
  }
}

fragment UserFullInfo on User {
  id
  email
  fullName
  isActive
  roles
}
```

## Ventajas de usar Fragments

1. Reutilización de código
2. Consistencia en las queries
3. Facilidad de mantenimiento
4. Reducción de duplicación
5. Queries más legibles
