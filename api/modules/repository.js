const _ = require("lodash");
const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/yet_another_list_db");

const ListSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "List name is required"],
    },
    tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task'
    }],
});

const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Task name is required"],
    },
    status: Boolean,
    list: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'List',
    }
});


const ListModel = mongoose.model("List", ListSchema);
const TaskModel = mongoose.model("Task", TaskSchema);


async function initializeDefaults(){

   const docs = await ListModel.find({});

   const isNotEmpty = docs.length > 0;
    
        if (!isNotEmpty) {
    
            // create a default list and some dummy taks in it
            const task1 = new TaskModel({
                name: "Buy Milk",
                status: false,
            });
            const task2 = new TaskModel({
                name: "Buy Flour",
                status: false,
            });
            const task3 = new TaskModel({
                name: "Buy Vegetables",
                status: false,
            });
            
            task1.save();
            task2.save();
            task3.save();
    
            const list = new ListModel({
                name:  _.capitalize("Things to buy"),
                tasks: [task1, task2, task3],
            });
    
            list.save();
        }
}


exports.getDefaultList = async () => {
    const res = await ListModel.find({}).populate('tasks');
    if(res.length > 0) return res[0];

    else {
        await initializeDefaults();
        return await ListModel.find({})[0];
    };
}

exports.getListByName = async (listName) => {

    listName = _.capitalize(listName);

    const doc = await ListModel.findOne({name: listName}).populate('tasks');
    if(!_.isEmpty(doc)) {
        return doc;  
    }
    else{
        const list = new ListModel({
            name: listName,
        });
        await list.save();
        return list;
    }
}

exports.getList = async (id) => {
    return await ListModel.findById(id).populate('tasks');
}

exports.addItem = async (item, listId) => {
    const task = new TaskModel({
        name: item,
        status: false,
    });
    await task.save();

    const list = await this.getList(listId);
    list.tasks.push(task);
    await list.save();
}

exports.updateItem = async (taskId) => {  

    const task = await TaskModel.findById(taskId);
    if(task) {
        task.status = !task.status;
        await task.save();
    }
}

exports.deleteItem = async (taskId) => {

    // await TaskModel.findByIdAndRemove(taskId);
    
    TaskModel.findByIdAndRemove(taskId, error => {
        if(!error) {
            console.log(`deleted the task successfully`);
        }
    });
}