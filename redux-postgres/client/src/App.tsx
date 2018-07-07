import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import store from './store';

interface Props {
  todos: string[];
}
interface State {
  isLoading: boolean;
  todoValue: string;
}
class App extends Component<Props, State> {
  state = { todoValue: '', isLoading: true };

  static mapStateToProps = (state: string[]) => ({ todos: state });

  clearTodos = async () => {
    await axios.post('http://localhost:4567/deletetodos');
    store.dispatch({ type: 'CLEAR_TODOS' });
  };

  addTodo = async () => {
    await axios.post(`http://localhost:4567/addtodo/${this.state.todoValue}`);
    store.dispatch({ type: 'ADD_TODO', todos: [this.state.todoValue] });
  };

  getTodos = async () => {
    const { data: todos } = await axios.get('http://localhost:4567/todos');
    this.setState({ isLoading: false });
    if (todos.length !== 0) store.dispatch({ type: 'ADD_TODO', todos });
  };

  componentDidMount() {
    this.getTodos();
  }

  render() {
    return (
      <div>
        <div style={{ display: 'flex' }}>
          <input
            onChange={event => this.setState({ todoValue: event.target.value })}
            style={{ fontSize: 24 }}
          />
          <button onClick={this.addTodo} style={{ fontSize: 24 }}>
            Add Todo
          </button>
          <button
            onClick={this.clearTodos}
            style={{ marginLeft: 5, fontSize: 24 }}
          >
            Clear Todos
          </button>
        </div>
        <ul style={{ fontSize: 30 }}>
          {this.state.isLoading
            ? 'Loading'
            : this.props.todos.map((todo: string) => (
                <li key={todo}>{todo}</li>
              ))}
        </ul>
      </div>
    );
  }
}
export default connect(App.mapStateToProps)(App);
