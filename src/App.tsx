import React, { FormEvent, useCallback, useMemo, useState } from 'react';

interface IBottle {
  quantity: number;
}

const App: React.FC = () => {
  const [Gallon, setGallon] = useState(0);
  const [newGallon, setNewGallon] = useState('');

  const [Bottles, setBottles] = useState<IBottle[]>([]);
  const [newBottle, setNewBottle] = useState('');

  const usedBottles = [];


  const handleAddBottle = useCallback(async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    Bottles?.push({
      quantity: Number(newBottle),
    })

    setBottles([...Bottles]);

  }, [Bottles, newBottle]);

  const handleAddGallon = useCallback(async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();



    setGallon(Number(newGallon));   
  }, [newGallon]);

  const getHigherValueBottles = useCallback((arr: Array<IBottle>): Number => {
    const arrayValues = arr.map(state => state.quantity);

    return Math.max(...arrayValues);
  }, []);


  const bottlesUsed = useMemo(() => {


    console.log(getHigherValueBottles(Bottles));
  }, [Bottles, getHigherValueBottles])


  return (
    <>
      <header style={{marginTop: '25px'}}>
        <strong>Insira o volume do galão</strong>
        <form onSubmit={handleAddGallon} style={{ flexDirection: "column", marginTop: "5px"}} >
          <input 
            placeholder="Quantidade de litros" 
            type="number"
            onChange={e => setNewGallon(e.target.value)}
          />
          <button type="submit">Inserir</button>
        </form>
      </header>
   
      <div style={{marginTop: '15px'}}>
        <strong>Insira volume da garrafa: </strong>

        <form onSubmit={handleAddBottle} style={{ flexDirection: "column", marginTop: "5px"}} >
          <input 
            placeholder="Quantidade de litros"
            type="number"
            onChange={e => setNewBottle(e.target.value)}
          />
          <button type="submit">Inserir</button>
        </form>
        
      </div>

      <div style={{marginTop: '50px'}}>
        <h4>RESULTADO</h4>
        <div style={{display: "flex", flexDirection: "column"}}>
          {Bottles.map((bottle, index) => (
            <div key={index}>
              <span>Garrafa {index}: {bottle.quantity} </span>

              
            </div>
          ))}
          <strong style={{marginTop: '20px'}}>Galão: {newGallon}L</strong>
          
          <div>
          <span>Garrafas usadas: {bottlesUsed}</span>          
          </div>
        </div>
      </div>
    </>
      

  );
}

export default App;
