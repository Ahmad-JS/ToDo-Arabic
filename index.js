//////////////////
    const dialoG = document.getElementById("dialoG"),
          dialogTool = document.getElementById("dialogTool"),
          dialogHtml = ` <br>
                      <input type="text" id="myText" placeholder="أدخل نص المهمة" required>
                        <br>
                      <div class="de">
                          <button type="button" class="but2" onclick="hiddenDialog()">إلغاء
                            </button>
                          <button type="button"  id="add-btn" class="but2" onclick="adDtasK()">إضافة
                            </button>
                      </div>
                    `;
//////////////////

          function showDialog() { 
            dialoG.showModal(); 
            dialogTool.innerHTML = dialogHtml;
          } 
          function hiddenDialog() { 
            dialoG.close();  
          } 
          function showDialog2() { 
            dialoG.showModal(); 
          } 

          function getTaskFromStorage(){
            let retrievedTasks = JSON.parse(localStorage.getItem("tasks"));
            tasks = retrievedTasks ?? []
          }
          getTaskFromStorage()

          const taskS = document.getElementById("tasks");
          function fillTasksOnThePage(){
            taskS.innerHTML="";
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
                <div class="task-text">
                <h3>${index+1} - ${task.title}</h3>
                    <div class="calendar" title="${calendaR_title}">
                        <span class="material-symbols-outlined calendar text-size">
                        calendar_month
                        </span>
                        <span class="date-size">
                        ${task.date}
                        </span>
                    </div>
                </div>
          <div class="group-buttons">
                  <button onclick="deleteTask(${index})" class="circular red" title="${deletE_title}">
                      <span class="material-symbols-outlined icon-size">
                      delete
                      </span>
                  </button>
            ${task.isDone ?`
                  <button onclick="toggleTaskCompletion(${index})" class="circular darkgreen" title="${removE_title}">
                    <span class="material-symbols-outlined icon-size">
                      remove_done
                    </span>
                  </button>
            `:`
                  <button onclick="toggleTaskCompletion(${index})" class="circular green" title="${donE_title}">
                      <span class="material-symbols-outlined icon-size">
                      done
                      </span>
                  </button>
            
            `}
            <button onclick="editTask(${index})" class="circular blue" title="${ediT_title}">
              <span class="material-symbols-outlined icon-size">
                edit
                </span>
            </button>
          </div>
        </div>
              `
              taskS.innerHTML +=content;
              index++
            }
      }

                    fillTasksOnThePage();
                    function adDtasK(){
                      let datE = new Date(),
                      date =  datE.toLocaleString(undefined, { dateStyle: "full", timeStyle: "short" })
                      var myText = document.getElementById("myText");
                      let taskName =   myText.value;
                      if (taskName===""){
                        let noText = dialogTool.innerHTML =
                        `
                        <p style="font-size: small;color: red;">حقل الإدخال يجب أن لايكون فارغ . !</p>
                            <input type="text" id="myText" placeholder="أدخل نص المهمة" required>
                            <div class="de">
                    <button type="button" class="but2" onclick="hiddenDialog()">إلغاء
                      </button>
                    <button type="button"  id="add-btn" class="but2" onclick="adDtasK()">إضافة
                      </button>
                </div>
                        `
                        ;
                      return noText;

                      }
                    let  taskObj = {
                                "title": taskName,
                                "date":date,
                                "isDone":false
                                    }
                          tasks.unshift(taskObj);
                          storeTasks();
                          fillTasksOnThePage();
                          hiddenDialog();
                          toasT('blue');
          }

            function deleteTask(index){
              showDialog2();
                    let task = tasks[index];
                    dialogTool.innerHTML =
                        ` <p style="font-size: small;color: red;">هل أنت متأكد من حذف :</p>
                            <p>${index+1} - ${task.title}</p> 
                <div class="de">
                <button id="nodelet" class="but2" onclick="hiddenDialog()">لا</button>
                  <button id="delet" class="but2" onclick="isConfirm(${index})">نعم</button>
                </div>
                        `;
                }
              
            function isConfirm(index) {
                tasks.splice(index,1);
                storeTasks();
                fillTasksOnThePage();
                hiddenDialog();
                toasT('red');
            }
        
              function editTask(index){
                showDialog2();
                let task = tasks[index];
                dialogTool.innerHTML =
                ` <p>إدخال عنوان المهمة الجديد</p>
                    
                    <input type="text" id="editText" value="${task.title}" required>
                    <div class="de">
                    <br>
                    <br>
                    <button id="nodelet" class="but2" onclick="hiddenDialog()">إلغاء</button>
                    <button id="delet" class="but2" onclick="editTask2(${index})">تحديث</button>
                  </div>
                `
                ;
            }

          function editTask2(index) {
                let task = tasks[index];
                var editText = document.getElementById("editText");
                let taskName =   editText.value;
                if (taskName===""){
                  let noText = dialogTool.innerHTML =
                  `
                  <p style="font-size: small;color: #ff1500;">حقل الإدخال يجب أن لايكون فارغ . !</p>
                      <input style="font-size: small;color: #ff1500;" type="text" id="myText" placeholder="تعديل او تحديث فقط" required><div class="de">
                      <br>
                      <br>
                      <button id="nodelet" class="but2" onclick="toasT('orange')">إلغاء العملية</button>
                      
                    </div>
                      
                  `
                  ;
                return noText;

                }
                task.title = taskName;
                storeTasks();
                fillTasksOnThePage();
                hiddenDialog();
                toasT('turquoise');
            }
              function toggleTaskCompletion(index){
                    let task = tasks[index];
                    task.isDone = !task.isDone;
                    storeTasks();
                    fillTasksOnThePage();
                    console.log(task.isDone)
                    if(!task.isDone)
                    toasT('wheat');
                    else toasT('green');
              }
              function storeTasks(){
                let tasksString =JSON.stringify(tasks);
                localStorage.setItem("tasks",tasksString);
              }

////////
              function toasT(msgColor) {
                
                if(msgColor==='green')
                  msgText ="رائع..مهمة منجزة !";
                if(msgColor==='wheat')
                    msgText ="مهمة تحتاج إكمال..!";
                if(msgColor==='red')
                  msgText ="تمت عملية الحذف !";
                if(msgColor==='blue')
                  msgText ="تمت الاضافة بنجاح !";
                if(msgColor==='orange')
                  msgText ="تم الغاء العملية !",
                  hiddenDialog();
                if(msgColor==='turquoise')
                  msgText ="تم تحديث المهمة بنجاح !";
                let toastText = document.getElementById("toastText");
                toastText.innerHTML=`<p class="toastText ${msgColor}">${msgText}</p>`;
                toastText.className = "show";
                setTimeout(()=>  toastText.className = toastText.className.replace("show",""),3000);
              }


