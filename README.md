
# Маршруты

### REST API PORT:

```
3000
```

### WEBSOCKET PORT:

```
3001
```

## API Reference

## REST

#### Создание кошелька

```
  POST /createWallet
```

#### Проверка существования кошелька

```
  POST /checkWallet
```

| Body      | Type     | Описание                |
| :-------- | :------- | :---------------------- |
| `key`     | `string` |  Приватный ключ         |

#### Получение всех данных кошелька

```
  GET /getWallet
```

| Header | Type     | Описание                |
| :-------- | :------- | :---------------------- |
| `Authorization: Bearer  PRIVATE_KEY`     | `string` |  Приватный ключ  |

#### Получение цепочки блокчейн

```
  GET /blockchain
```

#### Проверка валидности блокчейн

```
  GET /checkBlockchainValid
```

## WEBSOCKET

#### Совершение транзакции на другой кошелек

```
transaction
```


```
message:{
  privateKey: PRIVATE_KEY,
  address: TO_ADDRESS,
  amount: AMOUNT > 0 
}
```

#### Майнинг монеты на кошелек по публичному ключу
```
mine
```


```
message:{
   publicKey: PUBLIC_KEY,
   clicks: > 0
}
```



