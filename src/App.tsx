import React, { FormEvent, useCallback, useState } from 'react';

let total = 0.0;
let filterLitters: number[];

const App: React.FC = () => {
  const [Gallon, setGallon] = useState(0);
  const [newGallon, setNewGallon] = useState('');

  const [Bottles, setBottles] = useState([] as number[]);
  const [newBottle, setNewBottle] = useState('');

  const [usedBottles, setUsedBottles] = useState([] as number[]);

  const [leftLitters, setLeftLitters] = useState<Number>(0);

  function compareNumbers(a: number, b: number) {
    return b - a;
  }

  function subtractionDecimal(a: number, b: number) {
    return (a * 10 - b * 10) / 10;
  }

  const handleReset = useCallback(() => {
    window.location.reload();
  }, []);

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
    let ordenedBottles = Bottles.map(state => state);

    let Litters = [] as number[];

    ordenedBottles.sort(compareNumbers);

    ordenedBottles.reduce((acc, currentValue, currentIndex, array) => {
      total = subtractionDecimal(acc, currentValue);

      Litters.push(total);

      if ((total >= 0) || currentValue > Gallon) {
        usedBottles.push(currentValue);

        Litters.splice(currentIndex - 1, 1);

        return subtractionDecimal(acc, currentValue);
      } else {
        filterLitters = Litters.filter(litter => litter !== acc);

        return acc
      }
    }, Gallon);

    (Litters.length !== 0 && total !== 0) && (setLeftLitters(Math.max.apply(null, filterLitters)));

    Litters.length !== 0
      ? setUsedBottles([...usedBottles, Math.min.apply(null, ordenedBottles)])
      : setUsedBottles([...usedBottles])

  }, [Bottles, Gallon, usedBottles])


  return (
    <>
      <header style={{ marginTop: '25px' }}>
        <strong>Insira o volume do galão</strong>
        <form onSubmit={handleAddGallon} style={{ flexDirection: "column", marginTop: "5px" }} >
          <input
            placeholder="Quantidade de litros"
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

            <strong>Sobrou: {leftLitters}L</strong>

          </div>
          <button type="button" onClick={Result} style={{ maxWidth: '200px', marginTop: '20px' }}>RESULTADO</button>
          <button type="button" onClick={handleReset} style={{ maxWidth: '200px', marginTop: '20px' }}>Limpar</button>
        </div>
      </div>
    </>
  );
}

export default App;
