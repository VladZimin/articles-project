import { classNames } from '@/shared/lib/classNames/classNames';
import { Button as ButtonDeprecated, ButtonTheme } from '@/shared/ui';
import ListIconDeprecated from '@/shared/assets/icons/list-24-24.svg';
import TiledIconDeprecated from '@/shared/assets/icons/tiled-24-24.svg';
import ListIcon from '@/shared/assets/icons/burger.svg';
import TiledIcon from '@/shared/assets/icons/tile.svg';
import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon';
import { ArticleView } from '../../../entities/Article';
import cls from './ArticleViewSelector.module.scss';
import { toggleFeatures, ToggleFeaturesComponent } from '@/shared/lib/features';
import { Card, Icon } from '@/shared/ui/redesigned';

interface ArticleViewSelectorProps {
    className?: string
    onChangeView: (view: ArticleView) => void
    view?: ArticleView
}

const viewTypes = [
    {
        view: ArticleView.BIG,
        icon: toggleFeatures({
            name: 'isAppRedesigned',
            on: () => ListIcon,
            off: () => ListIconDeprecated,
        }),
    },
    {
        view: ArticleView.SMALL,
        icon: toggleFeatures({
            name: 'isAppRedesigned',
            on: () => TiledIcon,
            off: () => TiledIconDeprecated,
        }),
    },
];

export const ArticleViewSelector = (props: ArticleViewSelectorProps) => {
    const { className, onChangeView, view } = props;

    const onClickView = (newView: ArticleView) => () => {
        onChangeView(newView);
    };
    return (
        <ToggleFeaturesComponent
            name="isAppRedesigned"
            on={(
                <Card className={classNames(cls.ViewSelectorRedesigned, {}, [className])} border="round">
                    {viewTypes.map((viewObj) => (
                        <Icon
                            Svg={viewObj.icon}
                            clickable
                            onClick={onClickView(viewObj.view)}
                            className={classNames('', { [cls.notSelected]: view !== viewObj.view })}
                        />
                    ))}
                </Card>
            )}
            off={(
                <div className={classNames('', {}, [className])}>
                    {viewTypes.map((viewObj) => (
                        <ButtonDeprecated
                            key={viewObj.view}
                            theme={ButtonTheme.CLEAR}
                            onClick={onClickView(viewObj.view)}
                        >
                            <IconDeprecated
                                width={24}
                                height={24}
                                Svg={viewObj.icon}
                                className={classNames('', { [cls.notSelected]: view !== viewObj.view })}
                            />
                        </ButtonDeprecated>
                    ))}
                </div>
            )}
        />
    );
};
