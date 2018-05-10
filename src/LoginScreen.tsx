import * as React from 'react';
import App from './App';

export interface ILoginScreenProps {

}

export interface ILoginScreenState {
    isChatScreen: boolean;
    userName: string;
}

export class LoginScreen extends React.PureComponent<ILoginScreenProps, ILoginScreenState> {
    constructor(props: ILoginScreenProps) {
        super(props);
        this.state = { isChatScreen: false, userName: '' }
    }

    renderChatScreen = () => {
        return <App userName={this.state.userName} />
    }

    renderLoginScreen = () => {
        return <div className="login-container" >
            <div className="login-panel" >
                <h2>Login to my</h2>
                {/* <img src="https://media.tenor.com/images/18b767b668c6cf5bbb1b7d2c062c8060/tenor.gif" /> */}
                <div style={{ paddingBottom: '15px' }} >
                    < input
                        className="login-input"
                        placeholder="Enter your name.."
                        onChange={(e) => this.setState({ userName: e.target.value })} required />
                </div>
                <div>
                    <button onClick={() => this.setState({ isChatScreen: true })} >
                        Login
            </button>
                </div>
            </div>
        </div >
    }

    render() {
        return this.state.isChatScreen ? this.renderChatScreen() : this.renderLoginScreen()
    }
}

