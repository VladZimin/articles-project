import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonTheme } from 'shared/ui';
import ListIcon from 'shared/assets/icons/list-24-24.svg';
import TiledIcon from 'shared/assets/icons/tiled-24-24.svg';
import { Icon } from 'shared/ui/Icon/Icon';
import { ArticleView } from '../../../entities/Article';
import cls from './ArticleViewSelector.module.scss';

interface ArticleViewSelectorProps {
    className?: string
    onChangeView: (view: ArticleView) => void
    view?: ArticleView
}

const viewTypes = [
    {
        view: ArticleView.BIG,
        icon: ListIcon,
    },
    {
        view: ArticleView.SMALL,
        icon: TiledIcon,
    },
];

export const ArticleViewSelector = (props: ArticleViewSelectorProps) => {
    const { className, onChangeView, view } = props;

    const onClickView = (newView: ArticleView) => () => {
        onChangeView(newView);
    };
    return (
        <div className={classNames('', {}, [className])}>
            {viewTypes.map((viewObj) => (
                <Button key={viewObj.view} theme={ButtonTheme.CLEAR} onClick={onClickView(viewObj.view)}>
                    <Icon
                        Svg={viewObj.icon}
                        className={classNames('', { [cls.notSelected]: view !== viewObj.view })}
                    />
                </Button>
            ))}
        </div>
    );
};
