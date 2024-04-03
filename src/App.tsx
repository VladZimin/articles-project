import {Link, Route, Routes} from 'react-router-dom'
import './styles/index.scss'
import {MainPageLazy} from './pages/MainPage/MainPage.async'
import {AboutPageLazy} from './pages/AboutPage/AboutPage.async'
import {Suspense} from 'react'
import {useTheme} from './theme/useTheme'
import {classNames} from './helpers/classNames/classNames'

export const App = () => {

    const  {theme, toggleTheme} = useTheme()

    return (
        <div className={classNames('app', {ok: true, neok: false, cool: true}, [theme])}>
            <button onClick={toggleTheme}>TOGGLE</button>
            <Link to='/'>Главная</Link>
            <Link to='/about'>About</Link>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path='/' element={<MainPageLazy/>}/>
                    <Route path='/about' element={<AboutPageLazy/>}/>
                </Routes>
            </Suspense>
        </div>
    )
}

