# Documentação

#### base url
`https://node-api-git-main-gabrielcoutz.vercel.app`

#### Endpoints
_clique para ir até seus métodos :point_down:_

<a href="#post">

```javascript
/user -> POST | GET | PATCH | DELETE
```

</a>

<a href="#get">

```javascript
/users -> GET
```

</a>


<a href="#login">

```javascript
/login -> POST
```

</a>

#### Informações

- Todos erros são retornados com o objeto `{ message: '...' }`, juntamente do seu código no status, como `404`, `401`, `500`.
 
<br>

- O nome do erro, como `Unauthorized`, `BadRequest`, etc, será colocado em breve! Então não estranhe se nas requests abaixo estar mostrando `response.statusText` como vazio.

<br>

- Esta é uma API apenas para fins de testes, estudos e prática, os dados não persistem por muito tempo, sendo resetados periodicamente. Considerem de 10 em 10 minutos.

<br>

- Futuramente será adicionado o Typescript para agregar em todo projeto, então peço paciência :grin:

<br>

- Qualquer problema, sugestão ou comentário, estou aberto para contato no meu linkedin: [![LinkedIn](https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/gabrielcoutz/) 

---
<span id="post">:large_blue_diamond: Cadastrar dados</span>

```javascript
async function registerUser(user) {
  const response = await fetch('/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  const json = await response.json();

  if (!response.ok) console.log(`${response.statusText}: ${json.message}`);
  else console.log(json);
}

const user = {
  name: 'usuario',
  email: 'usuario@example.com',
  password: 'usuario',
};

registerUser(user);
```

<span>Response</span>
```typescript
{
  "id": string,
  "email": string,
  "name": string
}
```
---
<span id="get">:large_blue_diamond::large_blue_diamond: Consultar dados</span>

<span> :small_blue_diamond: Todos usuários</span>
```javascript
async function getUsers() {
  const response = await fetch('/users');
  const json = await response.json();

  if (!response.ok) console.log(`${response.statusText}: ${json.message}`);
  else console.log(json);
}

getUsers();
```
<span>Response</span>
```typescript
[
  {
    "id": string,
    "email": string,
    "name": string
  }
]
```

<span> :small_blue_diamond: Um usuário</span>
```javascript
async function getUser(userId) {
  const response = await fetch(`/user/${userId}`);
  const json = await response.json();

  if (!response.ok) console.log(`${response.statusText}: ${json.message}`);
  else console.log(json);
}

getUser('user_id_123');
```
<span>Response</span>
```typescript
{
  "id": string,
  "email": string,
  "name": string
}
```

---
<span id="patch">:large_blue_diamond: Atualizar dados

<a href="#login">:heavy_exclamation_mark: precisa estar logado :heavy_exclamation_mark:</a>
</span>
```javascript
async function updateUser(userId, payload) {
  const token = localStorage.getItem('MyToken');  // if you saved, obviously XD

  const response = await fetch(`/user/${userId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });
  const json = await response.json();

  if (!response.ok) console.log(`${response.statusText}: ${json.message}`);
  else console.log(json);
}

const user = {
  name: 'test updated',
  email: 'test.updated@example.com',
  password: 'test updated',
};

updateUser('user_id_123', user);
```

<span>Response</span>
```typescript
{
  "id": string,
  "email": string,
  "name": string
}
```
---
<span id="delete">:large_blue_diamond: Deletar usuário 

<a href="#login">:heavy_exclamation_mark: precisa estar logado :heavy_exclamation_mark:</a>
</span>
```javascript
async function deleteUser(userId) {
  const token = localStorage.getItem('MyToken');  // if you saved, obviously XD

  const response = await fetch(`/user/${userId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const json = await response.json();

  if (!response.ok) console.log(`${response.statusText}: ${json.message}`);
  else console.log(json);
}

deleteUser('user_id_123');
```

<span>Response</span>
```typescript
  boolean
```

---

#### Login

<span id="login"></span>
```javascript
async function login(payload) {
  const response = await fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  const json = await response.json();

  if (!response.ok) console.log(`${response.statusText}: ${json.message}`);
  else console.log(json);
}

const user = {
  email: 'test@example.com',
  password: 'test',
};

login(user);
```

<span>Response</span>
```typescript
{
  "token": string,
  "id": string
}
```
<hr>
<br>
<div style="text-align: center;" align="center">
<h3>

Feito com :sparkling_heart: por eu mesmo :blush:

</h3>
</div>