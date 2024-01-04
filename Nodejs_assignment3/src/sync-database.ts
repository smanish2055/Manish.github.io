
import {Todo} from './models/todosModel';


// sync() create the table if it odesn't exist , and does nothing if it already exists


// force:true  create the table and drops it first if it already exists

// sync({alter:true}) check current state of database and performs necessary changes in the table to make it match the model 


Todo.sync({force: true})
  .then((data) => {
    console.log("Table and model synced successfully");
  })
  .catch((error: Error) => {
    console.error("Error syncing model:", error.message);
  });
