import './styles/index.scss'
import {classNames} from 'shared/lib/classNames/classNames'
import {AppRouter} from 'app/providers/router/ui/AppRouter'
import {Navbar} from 'widgets/Navbar'
import {useTheme} from 'app/providers/ThemeProvider'
import {Sidebar} from 'widgets/Sidebar'

export const App = () => {

    const  {theme} = useTheme()

    return (
        <div className={classNames('app', {ok: true, neok: false, cool: true}, [theme])}>
            <Navbar/>
            <div className="content-page">
                <Sidebar/>
                <AppRouter/>
            </div>
        </div>
    )
}

