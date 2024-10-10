document.addEventListener('DOMContentLoaded',()=>{
    const todoInput = document.querySelector('#todoInput');
    const addTaskBtn =document.querySelector('#addTask');
    const todoList = document.querySelector('#todoList');

    let tasks =JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(element => renderTask(element));

    addTaskBtn.addEventListener('click',()=>{
        const taskText = todoInput.value.trim();

        if(!taskText) return;

        const newTask ={
            id:Date.now(),
            task:taskText,
            completed:false
        }

        tasks.push(newTask);
        saveTasks();
        console.log(tasks);
        
        todoInput.value='';
        renderTask(tasks)

    });
    function saveTasks() {
        localStorage.setItem('tasks',JSON.stringify(tasks));
    };

    function renderTask(e) {
        console.log(e);
        
        const li = document.createElement('li');
        li.innerHTML =`
            <span>${e.task}</span>
                        <button class="Btn">
                        <div class="sign">
                            <svg
                            viewBox="0 0 16 16"
                            class="bi bi-trash3-fill"
                            fill="currentColor"
                            height="18"
                            width="18"
                            xmlns="http://www.w3.org/2000/svg"
                            >
                            <path
                                d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"
                            ></path>
                            </svg>
                        </div>
    
                        <div class="text">Delete</div>
                        </button>
        `;

        li.addEventListener('click',(elem)=>{
            if(elem.target.tagName === 'BUTTON') return;
            e.completed = !e.completed;
            li.classList.toggle('completed');
            saveTasks();
        })
        li.querySelector('button').addEventListener('click',(d)=>{
            d.stopPropagation()
            tasks = tasks.filter(t => t.id !== e.id)
            saveTasks()
            // renderTask(tasks)
            window.location.reload()
        })


        todoList.appendChild(li);
    }
});

