import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import cls from './ArticleDetailsPage.module.scss';

interface ArticlesPageProps {
    className?: string
}

const ArticleDetailsPage = ({ className }:ArticlesPageProps) => {
    const { t } = useTranslation('articles');
    return (
        <div className={classNames(cls.ArticlesDetailsPage, {}, [className])}>
            {t('Article details page')}
        </div>
    );
};

export default ArticleDetailsPage;
