/*



DEPRECATED



*/
import React, {Component} from "react"
import TodoForm from "./todoform"
import TodoItem from "./todoitem"
import Grid from "@mui/material/Grid"

const api_url = 'http://localhost:3000/api/v1/todos'

class TodoList extends Component {
    constructor(props){
        super(props)

        this.state = {
            items: []
        }
        this.updateTodoList = this.updateTodoList.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
    }
    componentDidMount(){
        this.getTasks();

    }

    getTasks(){
        fetch(api_url)
            .then(response => response.json())
            .then(response_items => {
                this.setState({
                    items: response_items
                })
            });
    }

    updateTodoList(item){
        let _items = this.state.items
        //appends to array
        _items.unshift(item)
        this.setState({
            items: _items
        })
    }

    deleteItem(item){
        var deleteURL = api_url + `/${item.id}`
        fetch(deleteURL, {
            method: "DELETE"
        }).then(() => {
            var _items = this.state.items;
            var index = _items.indexOf(item)
            _items.splice(index, 1);
            this.setState({
                items: _items
            })
        })
    }

    render () {
        return (
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TodoForm api_url={api_url} updateTodoList={this.updateTodoList}/>
                </Grid>
                <Grid item xs={12} id = "todo_list">
                    {this.state.items.map((item) => (
                        <TodoItem 
                            key={item.id} 
                            item={item}
                            deleteItem={this.deleteItem} />
                    ))}
                </Grid>
            </Grid>
        )
    }
}
export default TodoList