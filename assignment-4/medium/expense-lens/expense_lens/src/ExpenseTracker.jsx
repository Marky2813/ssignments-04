import { useRef, useState } from "react"

function ExpenseTracker() {
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("food");
  const [description, setDescription] = useState("");
  const [rows, setRows] = useState([]);
  const idCounter = useRef(0);
  const [filter, setFilter] = useState("all");

  function handleSubmit(e) {
    e.preventDefault();
    //this is quite complex, is someone else is reading this code, they won't understand it.
    setRows((prev) => {
      return [...prev, { "id": idCounter.current, "amount": amount, "category": category, "description": description }]
    });
    idCounter.current = idCounter.current + 1;
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label for="amount">Enter Transaction Amount:</label>
        <span>₹</span>
        <input id="amount" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} name="amount"></input>
        <br></br>
        <label for='category'>Transaction Category</label>
        <select id='category' name="type" value={category} onChange={(e) =>
          setCategory(e.target.value)
        }>
          <option value='food'>Food</option>
          <option value='fuel'>Petrol</option>
          <option value='shopping'>Shopping</option>
          <option value='others'>Miscellaneous</option>
        </select>
        <br></br>
        <label for="description" name="description" >Enter Description</label>
        <input id="description" type="text" placeholder="payment details" value={description} onChange={(e) => setDescription(e.target.value)}></input> <br></br>
        <button type="submit">Add Transaction</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Amount</th>
            <th>Category</th>
            <th>Description</th>
            <th><select value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value='all'>All</option>
              <option value='food'>Food</option>
              <option value='fuel'>Petrol</option>
              <option value='shopping'>Shopping</option>
              <option value='others'>Miscellaneous</option>
            </select></th>
          </tr>
        </thead>
        <tbody>
          {rows.filter((rw)=>filter === "all" || filter === rw.category).map((rw) => {
          return (  
            <tr key={rw.id}>
                <th>{rw.amount}</th>
                <th>{rw.category}</th>
                <th>{rw.description}</th>
                <th><button onClick={() => {
                  console.log("hello")
                  setRows(rows.filter((e) => {
                    return e.id !== rw.id
                  }));
                }}>❎</button></th>
              </tr>)
          })}
        </tbody>
      </table>
    </>
  )
}

export default ExpenseTracker
//in react UI is a function of state, what you are thinking about append and everything that is dom thinking.

//how will you apply a filter, that is a good point. it is there on many websites and technically as it contains a lot of questions, it is a type of another form only. modifying rows doesn't make sense, as when the filter changes, then we will set it's state back, so that would be a free fund ka headache, instead let us maintain a state,  if that state is active then map mei list only category waale, else display the entire list.