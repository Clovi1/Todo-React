import React, {FC} from 'react';
import TodoContainer from "./components/TodoContainer";

const App: FC = () => {
    return (
        <div className={'flex justify-center items-center h-screen'}>
            <TodoContainer/>
        </div>
    );
};

export default App;