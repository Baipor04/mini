import React, { useState } from 'react';
import './App.css';
import logo from './logoo.jpg';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [editingId, setEditingId] = useState(null);

  const addOrEditExpense = (e) => {
    e.preventDefault();
    if (editingId) {
      // แก้ไขรายการ
      setExpenses((prevExpenses) =>
        prevExpenses.map((expense) =>
          expense.id === editingId ? { ...expense, title, amount: +amount } : expense
        )
      );
      setEditingId(null);
    } else {
      // เพิ่มรายการ
      const newExpense = {
        id: Math.random().toString(),
        title: title,
        amount: +amount
      };
      setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
    }
    setTitle('');
    setAmount('');
  };

  const deleteExpense = (id) => {
    setExpenses((prevExpenses) => prevExpenses.filter((expense) => expense.id !== id));
  };

  const startEditExpense = (id) => {
    const expense = expenses.find((expense) => expense.id === id);
    setTitle(expense.title);
    setAmount(expense.amount);
    setEditingId(expense.id);
  };

  const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div className="App">
      <img src="https://i.pinimg.com/564x/55/c6/7a/55c67a110bcadb64bac46048a5fc63a7.jpg" alt="logo" style={{width: '100px', height: '100px', margin: '0 auto', display: 'block'}} />
      <h2>ระบบรายรับรายจ่ายในชีวิตประจำวัน</h2>

      <form onSubmit={addOrEditExpense}>
        <div>
          <label htmlFor="title">รายการ</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="amount">จำนวนเงิน</label>
          <input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <button type="submit">{editingId ? 'แก้ไข' : 'เพิ่มรายการ'}</button>
      </form>
      <ul>
        {expenses.map((expense) => (
          <li key={expense.id}>
            {expense.title} - {expense.amount} บาท
            <button onClick={() => startEditExpense(expense.id)}>แก้ไข</button>
            <button onClick={() => deleteExpense(expense.id)}>ลบ</button>
          </li>
        ))}
      </ul>
      <h2>รวมยอด: {totalAmount} บาท</h2>
    </div>
  );
}

export default App;
