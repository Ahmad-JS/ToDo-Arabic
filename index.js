
                  // let tasks = [
                  //   {
                  //     "title": "قراءة كتاب",
                  //     "date":"15/2/2023",
                  //     "isDone":true
                  //   },{
                  //     "title": "إنهاء المشروع",
                  //     "date":"15/12/2028",
                  //     "isDone":true
                  //   },{
                  //     "title": "إنهاء الدرس",
                  //     "date":"15/11/2027",
                  //     "isDone":true
                  //   },{
                  //     "title": "حل التحدي",
                  //     "date":"15/12/2025",
                  //     "isDone":true
                  //   }
                  // ]

          function getTaskFromStorage(){
            let retrievedTasks = JSON.parse(localStorage.getItem("tasks"));
            tasks = retrievedTasks ?? []
          }
          getTaskFromStorage()

          function fillTasksOnThePage(){
            document.getElementById("tasks").innerHTML="";
            let index = 0,
            calendaR_title = "تاريخ إضافة المهمة",
            deletE_title = "حذف المهمة";
            removE_title = "تحديد مهمة غير مكتملة",
            donE_title = "تحديد مهمة مكتملة";
            ediT_title = "تعديل او تحديث المهمة";
      for (task of tasks){
              let content = 
              `
          <div id="task" class="task ${task.isDone ? 'done':''}">
                <div style="width: 60%;">
                    <h3>${task.title}</h3>
                    <div title="${calendaR_title}">
                        <span class="material-symbols-outlined calendar text-size">
                        calendar_month
                        </span>
                        <span class="text-size">
                        ${task.date}
                        </span>
                    </div>
                </div>
          <div class="group-buttons">
                  <button onclick="deleteTask(${index})" class="circular red" title="${deletE_title}">
                      <span class="material-symbols-outlined">
                      delete
                      </span>
                  </button>
            ${task.isDone ?`
                  <button onclick="toggleTaskCompletion(${index})" class="circular darkgreen" title="${removE_title}">
                    <span class="material-symbols-outlined">
                      remove_done
                    </span>
                  </button>
            `:`
                  <button onclick="toggleTaskCompletion(${index})" class="circular green" title="${donE_title}">
                      <span class="material-symbols-outlined">
                      done
                      </span>
                  </button>
            
            `}
            <button onclick="editTask(${index})" class="circular blue" title="${ediT_title}">
              <span class="material-symbols-outlined">
                edit
                </span>
            </button>
          </div>
        </div>
              `
          document.getElementById("tasks").innerHTML +=content;
          index++
            }
      }
          fillTasksOnThePage();
          document.getElementById("add-btn").addEventListener("click",()=>{
            let now = new Date(),
            date = now.getFullYear() + "/" + (now.getMonth()+1) + "/" + now.getDay() + " &#128338; " + now.getMinutes() + " : " + now.getHours(),
            taskName = prompt("الرجاء إدخال عنوان المهمة");
          let  taskObj = {
                      "title": taskName,
                      "date":date,
                      "isDone":false
                          }
                tasks.push(taskObj);
                storeTasks();
                fillTasksOnThePage();
          });

          function deleteTask(index){
            let task = tasks[index],
                isConfirmed = confirm("هل أنت متأكد من احذف :"+task.title);
            if(isConfirmed)
              tasks.splice(index,1);
              storeTasks();
              fillTasksOnThePage();
          }
          function editTask(index){
                let task = tasks[index],
                newTaskTitle = prompt("الرجاء إدخال عنوان المهمة الجديد",task.title);

                task.title = newTaskTitle;
                storeTasks();
                fillTasksOnThePage();
          }
          function toggleTaskCompletion(index){
                let task = tasks[index];
                task.isDone = !task.isDone;
                storeTasks();
                fillTasksOnThePage();
          }
          function storeTasks(){
            let tasksString =JSON.stringify(tasks);
            localStorage.setItem("tasks",tasksString);
          }

