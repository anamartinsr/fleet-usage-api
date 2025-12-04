# Fleet Usage API

API desenvolvida para gerenciar automóveis, motoristas e registros de utilização de veículos dentro de uma frota.
O sistema permite cadastrar e controlar veículos, motoristas e o uso de cada automóvel, garantindo que apenas um motorista utilize um carro por vez.

## Funcionalidades
### Automóveis
* Cadastro de novos automóveis
* Atualização e exclusão
* Consulta por ID
* Listagem com filtros por cor e marca

  Campos controlados:
   * Placa
   * Cor
   * Marca

### Motoristas
* Cadastro de motoristas
* Atualização e exclusão
* Consulta por ID
* Listagem com filtro por nome

  Campos controlados:
   * Nome

### Utilização dos automóveis
Criar registro de uso contendo
  * Data de início
  * Motivo de utilização
  * Motorista
  * Automóvel

Finalizar o uso registrando
  * Data de término

Listar todas as utilizações com
  * Nome do motorista
  * Dados do automóvel
  * Datas de início e término
  * Motivo da utilização
  
* Finalização de utilização
* Listagem das utilizações com dados completos do motorista e automóvel
  
  Regras que garantem:
   * Um carro só pode estar em uso por um motorista por vez
   * Um motorista não pode utilizar mais de um carro simultaneamente

## Tecnologias utilizadas
* Node.js
* Express.js
* TypeScript
* Jest 
* Clean Architecture

## Como baixar e rodar o projeto 
1. Clonar o repositório

```
git clone https://github.com/anamartinsr/fleet-usage-api
```

2. Entrar na pasta

```
cd fleet-usage-api
```
3. Instalar dependências
* É necessário ter Node.js instalado.
Depois, rode:
```
npm install
```

4. Crie um arquivo .env na raiz do projeto, seguindo o arquivo .env.example como guia

Servidor iniciará normalmente (geralmente em http://localhost:3000).

5. Rodar o servidor

```
npm run dev
```

6. Rodar os testes

```
npm run test
```

Os testes cobrem:
* Repositórios (in-memory)
* Use cases
* Regras de negócio
* Validações de disponibilidade


