import './styles/index.scss'
import {useTheme} from 'app/providers/ThemeProvider/lib/useTheme'
import {classNames} from 'shared/lib/classNames/classNames'
import {AppRouter} from 'app/providers/router/ui/AppRouter'
import {Navbar} from 'widgets/Navbar'

export const App = () => {

    const  {theme, toggleTheme} = useTheme()

    return (
        <div className={classNames('app', {ok: true, neok: false, cool: true}, [theme])}>
            <Navbar/>
            <AppRouter/>
            <button onClick={toggleTheme}>TOGGLE</button>
        </div>
    )
}

