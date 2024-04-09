import './styles/index.scss'
import {classNames} from 'shared/lib/classNames/classNames'
import {AppRouter} from 'app/providers/router/ui/AppRouter'
import {Navbar} from 'widgets/Navbar'
import {useTheme} from 'app/providers/ThemeProvider'

export const App = () => {

    const  {theme} = useTheme()

    return (
        <div className={classNames('app', {ok: true, neok: false, cool: true}, [theme])}>
            <Navbar/>
            <AppRouter/>
        </div>
    )
}

