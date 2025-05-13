# Маршруты

### REST API PORT:

```
3000
```

### WEBSOCKET PORT:

```
3001
```

## REST

<div style="display:flex; flex-direction:column; gap:50px;">
  <div>
    <div style="display:flex; align-items:center; gap:20px; margin-bottom:10px">
      <div style="background-color:rgb(146, 144, 6);color:#fff; padding: 5px; width:fit-content; border-radius: 5px;">
        /POST
      </div>  
      /createWallet 
    </div>
    <div style="font-size:24px;font-weight:600;">Описание</div>
    <div>Создание кошелька</div>
  </div>
  <div>
    <div style="display:flex; align-items:center; gap:20px; margin-bottom:10px">
      <div style="background-color:rgb(146, 144, 6);color:#fff; padding: 5px; width:fit-content; border-radius: 5px;">
        /POST
      </div>  
      /checkWallet 
    </div>
    <div style="font-size:24px;font-weight:600;">Описание</div>
    <div>Проверка существования кошелька</div>
    
    ```
    body: {
      key: PRIVATE_KEY
      }
    ```
  </div>
  <div>
    <div style="display:flex; align-items:center; gap:20px; margin-bottom:10px">
      <div style="background-color:rgb(58, 129, 49);color:#fff; padding: 5px; width:fit-content; border-radius: 5px;">
        /GET
      </div>  
      /getWallet 
    </div>
    <div style="font-size:24px;font-weight:600;">Описание</div>
    <div>Получение всех данных кошелька</div>
    
    ```
    HEADER: {
      Authorization: Bearer  PRIVATE_KEY
      }
    ```
  </div>
  <div>
    <div style="display:flex; align-items:center; gap:20px; margin-bottom:10px">
      <div style="background-color:rgb(58, 129, 49);color:#fff; padding: 5px; width:fit-content; border-radius: 5px;">
        /GET
      </div>  
      /blockchain 
    </div>
    <div style="font-size:24px;font-weight:600;">Описание</div>
    <div>Получение цепочки блокчейн</div>
  </div>
  <div>
    <div style="display:flex; align-items:center; gap:20px; margin-bottom:10px">
      <div style="background-color:rgb(58, 129, 49);color:#fff; padding: 5px; width:fit-content; border-radius: 5px;">
        /GET
      </div>  
      /checkBlockchainValid 
    </div>
    <div style="font-size:24px;font-weight:600;">Описание</div>
    <div>Проверка валидности блокчейн</div>
  </div>
</div>

## Socket.io

<div style="display:flex; flex-direction:column; gap:30px;">
  <div>
    <div style="display:flex; align-items:center; gap:20px; margin-bottom:10px">
      <div style="background-color:rgb(49, 61, 129);color:#fff; padding: 5px; width:fit-content; border-radius: 5px;">
        Socket.io
      </div>  
      mine
    </div>
    <div style="font-size:24px;font-weight:600;">Описание</div>
    <div>Майнинг монеты на кошелек по публичному ключу</div>
    
    ```
    message:{
       publicKey: PUBLIC_KEY,
       clicks: > 0
    }
    ```
  </div>
  <div>
    <div style="display:flex; align-items:center; gap:20px; margin-bottom:10px">
      <div style="background-color:rgb(49, 61, 129);color:#fff; padding: 5px; width:fit-content; border-radius: 5px;">
        Socket.io
      </div>  
      transaction
    </div>
    <div style="font-size:24px;font-weight:600;">Описание</div>
    <div>Совершение транзакции на другой кошелек</div>
    
    ```
    message:{
      privateKey: PRIVATE_KEY,
      address: TO_ADDRESS,
      amount: AMOUNT > 0 
    }
    ```
  </div>
</div>
