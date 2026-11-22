import { useState } from "react";

const PLACE = "Uniform shop";
const COLOUR = "steelblue";
const ROLL = "247219";

function checkAdd(name, money) {
  if (name.trim() === "") return { ok: false, line: "Type a name" };
  if (money.trim() === "") return { ok: false, line: "Type an amount" };
  const amount = Number(money);
  if (Number.isNaN(amount)) return { ok: false, line: money + " is not a number" };
  return { ok: true, line: "", amount: amount };
}

function Slip({ name, money, onName, onMoney, onAdd }) {
  return (
    <form
      className="slip"
      onSubmit={function (event) {
        event.preventDefault();
        onAdd();
      }}
    >
      <input
        placeholder="Name"
        value={name}
        onChange={function (event) {
          onName(event.target.value);
        }}
      />
      <input
        placeholder="Amount"
        value={money}
        onChange={function (event) {
          onMoney(event.target.value);
        }}
      />
      <button type="submit">Add</button>
    </form>
  );
}

function Board({ rows }) {
  return (
    <ul className="board">
      {rows.map(function (row, index) {
        return (
          <li key={index}>
            <span>{row.name}</span> <span>{row.amount}</span>
          </li>
        );
      })}
    </ul>
  );
}

function paid(rows) {
  return rows.reduce(function (sum, row) {
    return sum + row.amount;
  }, 0);
}

export default function App() {
  const [name, setName] = useState("");
  const [money, setMoney] = useState("");
  const [rows, setRows] = useState([]);
  const [line, setLine] = useState("");

  function addFee() {
    const result = checkAdd(name, money);
    setLine(result.line);
    if (!result.ok) return;
    setRows(rows.concat({ name: name.trim(), amount: result.amount }));
    setName("");
    setMoney("");
  }

  return (
    <div>
      <header className="place" style={{ background: COLOUR }}>
        <h1 style={{ color: "white" }}>{PLACE}</h1>
      </header>
      <main>
        <div className="card">
          <Slip
            name={name}
            money={money}
            onName={setName}
            onMoney={setMoney}
            onAdd={addFee}
          />
          <p className="line">{line}</p>
        </div>
        <div className="card">
          <h2 className="title">Board</h2>
          {rows.length === 0 ? <p className="empty">No fees yet</p> : <Board rows={rows} />}
        </div>
        <div className="card">
          <p className="paid">
            <span>Paid</span> <span>{paid(rows)}</span>
          </p>
        </div>
      </main>
      <footer>{ROLL}</footer>
    </div>
  );
}
