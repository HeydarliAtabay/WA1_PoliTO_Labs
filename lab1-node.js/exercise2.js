const sqlite = require('sqlite3');
const dayjs = require('dayjs');


const db = new sqlite.Database('tasks.db',
    (err) => { if(err) throw err; });

    function Task(id, description, urgent, pub, deadline) {
        this.id = id;
        this.description = description;
        this.urgent = urgent;
        this.pub = pub;
        if(deadline)this.deadline = deadline;
    
        this.toString = () => (`Id: ${this.id}, Description: ${this.description} , Urgent: ${this.urgent} , Private: ${this.pub}, Deadline: ${this.deadline}`);
    }

function TaskList() {

    this.tasks = [] ;
    
    this.add = (task) => {
        this.tasks.push(task);
    };
    this.toString = () => ( this.tasks.map((task)=>(task.toString())).join('\n') );
}

// ********************EXERCISE 2.1***************************
// For getting all tasks from the DB

function getAll() {
    const sql = `SELECT * FROM tasks` ;
    return new Promise( (resolve, reject) => {
        db.all(sql, (err, rows) => {
            if(err)
                reject(err);
            else {
                let list = new TaskList() ;

                for( row of rows ) {
                    let task = new Task(
                        row.id, row.description, row.urgent, row.private, row.deadline
                    ) ;
                    list.add(task) ;
                }

                resolve(list);
            }
        }) ;
    });
}


// ********************EXERCISE 2.2***************************
// function for getting tasks which has deadline after giving date

function getWithGivenDate(deadline) {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM tasks WHERE deadline > DATE(?)"
        db.all(sql, [deadline], (err, rows) => {
            if (err)
                reject(err);    
            else {
            let list = new TaskList() ;
            for( row of rows ) {
                let task = new Task(row.id, row.description, row.urgent, row.private, row.deadline) ;
                   list.add(task) ;
               }
                
                resolve(list);
            }
        });
    });
};
///"SELECT id, description, urgent, private, deadline FROM tasks WHERE description LIKE ?"



// ********************EXERCISE 2.3***************************
// function which returns tasks with the given word in its description

function getWithGivenWord(word) {
    return new Promise((resolve, reject) => {
       // const sql = "SELECT id, description, urgent, private, deadline FROM tasks WHERE description LIKE ?"
       const sql ="SELECT t.id, t.description, t.urgent, t.private, t.deadline FROM tasks t WHERE t.description LIKE '%' || ? || '%'"
        db.all(sql, [word], (err, rows) => {
            if (err)
                reject(err);    
            else {
            let list = new TaskList() ;
            for( row of rows ) {
                let task = new Task(row.id, row.description, row.urgent, row.private, row.deadline) ;
                   list.add(task) ;
               }
                
                resolve(list);
            }
        });
    });
};



async function main() {
   
    let all=await getAll();
    console.log(`\n ********** List of all tasks ***********\n`)
    console.log(all.toString())

   // let deadline=dayjs('2021-03-15')
   let deadline='2021-03-15' 
   let listdate = await getWithGivenDate(deadline) ;
   console.log(`\n ************* Task(s) with deadline after ${deadline} ***************`)
    console.log(listdate.toString())


    let word ='call'
    let list= await getWithGivenWord(word)
    console.log(` \n ********** Task(s) which contain word ${word} in its description ***********\n`)
   console.log(list.toString())
   db.close();
}

main() ;