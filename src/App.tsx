import React, { FormEvent, useCallback, useState } from 'react';

// interface IBottle {
//   quantity: number;
// }

let total = 0;

const App: React.FC = () => {
  const [Gallon, setGallon] = useState(0);
  const [newGallon, setNewGallon] = useState('');

  const [Bottles, setBottles] = useState([] as number[]);
  const [newBottle, setNewBottle] = useState('');

  const [usedBottles, setUsedBottles] = useState([] as number[]);

  function compareNumbers(a: number, b: number) {
    return b - a;
  }

  const handleAddBottle = useCallback(async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    Bottles.push(Number(newBottle));

    setBottles([...Bottles]);
  }, [Bottles, newBottle]);

  const handleAddGallon = useCallback(async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    setGallon(Number(newGallon));

  }, [newGallon]);



  const Result = useCallback(() => {
    // let bottlesValueArray = Bottles.map(state => state);

    let ordenedBottles = Bottles.map(state => state);

    ordenedBottles.sort(compareNumbers);

    ordenedBottles.reduce((acc, currentValue, currentIndex, array) => {
      total = acc + currentValue;

      if (total > Gallon || currentValue > Gallon) {
        // array.splice(currentIndex);

        ordenedBottles.splice(currentIndex);

        setUsedBottles([...ordenedBottles]);

      }

      return acc + currentValue;

    }, 0);

  }, [Bottles, Gallon])


  return (
    <>
      <header style={{ marginTop: '25px' }}>
        <strong>Insira o volume do galão</strong>
        <form onSubmit={handleAddGallon} style={{ flexDirection: "column", marginTop: "5px" }} >
          <input
            placeholder="Quantidade de litros"
            type="number"
            onChange={e => setNewGallon(e.target.value)}
          />
          <button type="submit">Inserir</button>
        </form>
      </header>

      <div style={{ marginTop: '15px' }}>
        <strong>Insira volume da garrafa: </strong>

        <form onSubmit={handleAddBottle} style={{ flexDirection: "column", marginTop: "5px" }} >
          <input
            placeholder="Quantidade de litros"
            onChange={e => setNewBottle(e.target.value)}
          />
          <button type="submit">Inserir</button>
        </form>
      </div>

      <div style={{ marginTop: '20px' }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <strong style={{ marginBottom: '10px' }}>Galão: {Gallon}L</strong>

          {Bottles.map((bottle, index) => (
            <div key={index}>
              <span>Garrafa {index}: {bottle} </span>
            </div>
          ))}


          <div style={{ marginTop: '20px', display: "flex", flexDirection: "row" }}>
            <strong>Garrafas usadas: &nbsp;</strong>
            {usedBottles.map((usedBottle, index) => (
              <div key={index}>
                  <span>{usedBottle}L, &nbsp;</span>
              </div>          
            ))}
          </div>
          <button type="button" onClick={Result} style={{ maxWidth: '200px', marginTop: '20px' }}>RESULTADO</button>
        </div>
      </div>
    </>
  );
}

export default App;
