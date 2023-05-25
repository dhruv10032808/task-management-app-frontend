var form=document.getElementById('form');
var list=document.getElementById('list');
var title=document.getElementById('title');
var description=document.getElementById('description');
var currentStatus=document.getElementById('status');
form.addEventListener('submit',local)
function local(e){
    e.preventDefault();
    var title=e.target.title.value;
    var description=e.target.description.value;
    var status=e.target.status.value;
   let obj={
    title,
    description,
    status
   };
   axios.post('http://localhost:3000/add-task',obj)
   .then((res)=>{
    document.getElementById('title').value="";
    document.getElementById('description').value="";
    document.getElementById('status').value="";
    console.log(res)
    onsubmit(res.data);
   })
   .catch((err)=>{
    document.body.innerHTML=document.body.innerHTML+`<h4>Something went wrong</h4>`
})
}

window.addEventListener('DOMContentLoaded', () => {
    axios.get('http://localhost:3000/get-task')
        .then((res)=>{
            for(var i=0;i<res.data.length;i++){
                onsubmit(res.data[i]);
            }
            console.log(res)
        })
        .catch((err)=>console.log(err));

     })

function onsubmit(task){
    var btn=document.createElement('button');
    btn.appendChild(document.createTextNode('Edit Task'));
    var btn2=document.createElement('button');
    btn2.appendChild(document.createTextNode('Delete Task'));
    btn2.setAttribute('onclick',"del('"+task._id+"')");
    console.log(btn2);
    btn.setAttribute('onclick',"edit('"+task._id+"','"+task.title+"','"+task.description+"','"+task.status+"')");
    var li=document.createElement('li');
    li.id=task._id;
    console.log(li);
    li.appendChild(document.createTextNode(task.title +"-"+ task.description +"-"+ task.status));
    li.appendChild(btn) ;
    li.appendChild(btn2) ;
    list.appendChild(li);
}
function edit(taskId,previousTitle,previousDescription,previousStatus){
        title.value=previousTitle;
        description.value=previousDescription;
        currentStatus.value=previousStatus;
        del(taskId);
}

function del(taskId){ 
    axios.delete(`http://localhost:3000/delete-task/${taskId}`)
    .then((response)=>{
    const curr=document.getElementById(taskId);
    list.removeChild(curr);
    })
    .catch((err)=>console.log(err));
}