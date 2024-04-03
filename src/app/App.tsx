import {Link, Route, Routes} from 'react-router-dom'
import './styles/index.scss'
import {Suspense} from 'react'
import {useTheme} from 'app/providers/ThemeProvider/lib/useTheme'
import {classNames} from 'shared/lib/classNames/classNames'
import {MainPage} from 'pages/MainPage'
import {AboutPage} from 'pages/AboutPage'

export const App = () => {

    const  {theme, toggleTheme} = useTheme()

    return (
        <div className={classNames('app', {ok: true, neok: false, cool: true}, [theme])}>
            <button onClick={toggleTheme}>TOGGLE</button>
            <Link to='/'>Главная</Link>
            <Link to='/about'>About</Link>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path='/' element={<MainPage/>}/>
                    <Route path='/about' element={<AboutPage/>}/>
                </Routes>
            </Suspense>
        </div>
    )
}

