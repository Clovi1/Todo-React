import React, {FC} from 'react';
import TodoContainer from "./components/TodoContainer";

const App: FC = () => {
    return (
        <div className={'flex justify-center items-center h-screen bg-neutral-900'}>
            <TodoContainer/>
        </div>
    );
};

export default App;