# TOTVS ToDo App - Test

> Angular 11+

## Índice
* [Intuíto](#intuito)
* [Execução](#execucao)
* [Estrutura](#estrutura)

### Intuíto:
Desenvolver um projeto de acordo com o arquivo `./Desafio front-end.pdf` para empresa **TOTVS**.

### Execução
Para executar o projeto, primeiramente, é preciso executar o comando a seguir para simular uma API com **JsonServer**:
```Bash
$ json-server --delay 500 db.json
```

Com a API em execução, basta executar o seguinte comando:

```Bash
$ ng serve
```

Depois de executar, basta [`acessar a URL`](http://localhost:4200/)

### Estrutura
No download, você encontrará os seguintes diretórios e arquivos:

```
totvs-todo-test
|   db.json
|   Desafio front-end.pdf
|   README.md
|   
\---todo-app
    |   .browserslistrc
    |   .editorconfig
    |   .gitignore
    |   angular.json
    |   karma.conf.js
    |   package-lock.json
    |   package.json
    |   README.md
    |   tsconfig.app.json
    |   tsconfig.json
    |   tsconfig.spec.json
    |   tslint.json
    |   
    +---e2e
    |
    +---node_modules              
    |
    \---src
        |   favicon.ico
        |   index.html
        |   main.ts
        |   polyfills.ts
        |   styles.scss
        |   test.ts
        |   
        +---app
        |   |   app-routing.module.ts
        |   |   app.component.html
        |   |   app.component.scss
        |   |   app.component.spec.ts
        |   |   app.component.ts
        |   |   app.module.ts
        |   |   
        |   +---components
        |   |   +---Footer
        |   |   |       footer.component.html
        |   |   |       footer.component.scss
        |   |   |       footer.component.spec.ts
        |   |   |       footer.component.ts
        |   |   |       
        |   |   +---ListGroup
        |   |   |       list-group.component.html
        |   |   |       list-group.component.scss
        |   |   |       list-group.component.spec.ts
        |   |   |       list-group.component.ts
        |   |   |       
        |   |   +---Modal
        |   |   |       modal.component.html
        |   |   |       modal.component.scss
        |   |   |       modal.component.spec.ts
        |   |   |       modal.component.ts
        |   |   |       
        |   |   \---Navbar
        |   |           navbar.component.html
        |   |           navbar.component.scss
        |   |           navbar.component.spec.ts
        |   |           navbar.component.ts
        |   |           
        |   +---models
        |   |       error.spec.ts
        |   |       error.ts
        |   |       list.spec.ts
        |   |       list.ts
        |   |       task.spec.ts
        |   |       task.ts
        |   |       
        |   \---services
        |       |   helper.service.spec.ts
        |       |   helper.service.ts
        |       |   message.service.spec.ts
        |       |   message.service.ts
        |       |   
        |       \---api
        |               list-data.service.spec.ts
        |               list-data.service.ts
        |               task-data.service.spec.ts
        |               task-data.service.ts
        |               
        +---assets
        |       .gitkeep
        |       
        \---environments
                environment.prod.ts
                environment.ts
                
```
