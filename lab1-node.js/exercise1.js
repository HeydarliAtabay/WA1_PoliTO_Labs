'use strict';

const dayjs = require('dayjs');

const locformat=require('dayjs/plugin/localizedFormat')
dayjs.extend(locformat)


function Task(id, description, urgent, pub, deadline) {
    this.id = id;
    this.description = description;
    this.urgent = urgent;
    this.pub = pub;
   this.deadline = deadline && dayjs(deadline);

    this.toString = () => (`Id: ${this.id}, Description: ${this.description} , Urgent: ${this.urgent} , Private: ${this.pub}, Deadline: ${this._formatDeadline('LLL')}`);

    this._formatDeadline = (format) => {
        return this.deadline ? this.deadline.format(format) : '<not defined>';
      }
}

function TaskList() {

    this.tasks = [] ;
    
    this.add = (task) => {
        this.tasks.push(task);
    };

    this.SortAndPrint = () => {
        let sortedList = [...this.tasks] ;
        sortedList.sort((a,b)=>{
            if(a.deadline===b.deadline) return 0
            else if(a.deadline===null||a.deadline==='') return 1
            else if(b.deadline===null||b.deadline==='') return -1
            else return a.deadline.diff(b.deadline)
        })
        return sortedList ;
    }


    this.filterAndPrint = () => {
        let result = new TaskList() ;
        this.tasks.filter((task)=> (task.urgent==false)).forEach((task)=>{result.add(task)}) ;
        return result;
    }

    this.toString = () => ( this.tasks.map((task)=>(task.toString())).join('\n') );

}

const t1=new Task(1,'Wake up at 06:00',true,false,'2021-03-25T09:00:00.000Z')
const t2=new Task(2,'Play basketball',false,false,null)
const t3=new Task(3,'Upload the WA1 lab',true,false,'2021-03-28T09:00:00.000Z')
const t4=new Task(4,'Watch SDP lectures',false,false,'2021-03-24T09:00:00.000Z')
// console.log(`${t1}`) ;
// console.log(`${t2}`) ;
// console.log(`${t3}`) ;
// console.log(`${t4}`) ;

const myTasks = new TaskList() ;
myTasks.add(t1);
myTasks.add(t2);
myTasks.add(t3);
myTasks.add(t4);
console.log('********** List of all Tasks ************\n')
console.log(myTasks.toString())

 console.log('\n****** Tasks sorted by deadline (most recent first): ******');
console.log(myTasks.SortAndPrint().toString());

console.log('****** Tasks filtered, only (urgent == false): ******');
console.log(myTasks.filterAndPrint().toString());

