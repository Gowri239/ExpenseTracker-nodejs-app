async function expenseDetails(e){
    try{
        e.preventDefault()
        const obj = {
            exp_amt: e.target.expenseamount.value,
            disc: e.target.discription.value,
            ctg: e.target.category.value
        }
        const response  = await axios.post("http://localhost:3000/expense/add-expense",obj)
        if(response.status===201){
            addExpenseToScreen(response.data.expense)
        }
    }
    catch(err){
        document.body.innerHTML += `<div style="color:red;">${err.message}</div>`
    } 
}

window.addEventListener("DOMContentLoaded",async () =>{
    try{
        const response = await axios.get("http://localhost:3000/expense/getexpenses")
        response.data.expenses.forEach((expense) => {
        addExpenseToScreen(expense)
        })
    }
    catch(err){
        console.log(err)
    }
    })


function addExpenseToScreen(expense){
    const parentElement = document.getElementById('listOfExpenses')
    const expenseElemId = `expense-${expense.id}`;
    parentElement.innerHTML += `
        <li id=${expenseElemId}>
            ${expense.exp_amt} - ${expense.ctg} - ${expense.disc}
            <button onclick='deleteExpense(event, ${expense.id})'>
                Delete Expense
            </button>
        </li>`
}

function deleteExpense(e,expenseId){
    axios.delete(`http://localhost:3000/expense/delete-expense/${expenseId}`).then(()=>{
        removeExpenseFromScreen(expenseId)
    }).catch(err => {
        console.log(err)
    })
}

function removeExpenseFromScreen(expenseId){
    const expenseElemId = `expense-${expenseId}`;
    document.getElementById(expenseElemId).remove();
    
}

