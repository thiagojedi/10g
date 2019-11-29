import { h } from 'preact';
import { MainLayout } from "../modules/application/main-layout"

const MainPage = () => {
    return (
        <MainLayout headerTitle="Ten Grams" actions>
            <h1>Hello World!</h1>
        </MainLayout>
    )
}

export default MainPage;