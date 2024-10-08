import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Article, ArticleList } from 'entities/Article';
import { ArticleBlockType, ArticleType } from 'entities/Article/model/types/article';
import cls from './ArticlesPage.module.scss';

interface ArticlesPageProps {
  className?: string
}
const article: Article = {
    id: '1',
    title: 'Javascript newsddddddddddddddddddddddddddddddddddddddddddddddddddddd',
    subtitle: 'Что нового в JS за 2022 год?',
    img: 'https://teknotower.com/wp-content/uploads/2020/11/js.png',
    views: 1022,
    createdAt: '26.02.2022',
    user: {
        id: '1',
        username: 'admin',
        avatar: 'https://cdn3.iconfinder.com/data/icons/roles-computer-it/128/front-end_developer-2-1024.png',
    },
    type: [
        ArticleType.IT,
        ArticleType.SCIENCE,
        ArticleType.ECONOMICS,
        ArticleType.SCIENCE,
    ],
    blocks: [
        {
            id: '1',
            type: ArticleBlockType.TEXT,
            title: 'Заголовок этого блока',
            paragraphs: [
                'Программа, которую по традиции называют «Hello, world!», очень проста. Она выводит'
          + ' куда-либо фразу «Hello, world!», или другую подобную, средствами некоего языка.',
                'JavaScript — это язык, программы на котором можно выполнять в разных средах. В '
          + 'нашем случае речь идёт о браузерах и о серверной платформе Node.js. Если до сих '
          + 'пор вы не написали ни строчки кода на JS и читаете этот текст в браузере, '
          + 'на настольном компьютере, это значит, что вы буквально в считанных секундах от '
          + 'своей первой JavaScript-программы.',
            ],
        },
        {
            id: '4',
            type: ArticleBlockType.CODE,
            code: '<!DOCTYPE html>\n<html>\n  <body>\n    <p id="hello"></p>\n\n    <script>\n      '
          + 'document.getElementById("hello").innerHTML = "Hello, world!";\n    </script>\n  '
          + '</body>\n</html>;',
        },
        {
            id: '5',
            type: ArticleBlockType.TEXT,
            title: 'Заголовок этого блока',
            paragraphs: [
                'Программа, которую по традиции называют «Hello, world!», очень проста. Она выводит'
          + ' куда-либо фразу «Hello, world!», или другую подобную, средствами некоего языка.',
                'JavaScript — это язык, программы на котором можно выполнять в разных средах. В '
          + 'нашем случае речь идёт о браузерах и о серверной платформе Node.js. Если до сих '
          + 'пор вы не написали ни строчки кода на JS и читаете этот текст в браузере, '
          + 'на настольном компьютере, это значит, что вы буквально в считанных секундах от '
          + 'своей первой JavaScript-программы.'],
        },
    ],
};

const ArticlesPage = ({ className }: ArticlesPageProps) => {
    const { t } = useTranslation('articles');
    return (
        <div className={classNames(cls.ArticlesPage, {}, [className])}>
            <ArticleList
                articles={new Array(16).fill(0)
                    .map((_, i) => ({
                        ...article,
                        id: String(i),
                    }))}
                isLoading
            />
        </div>
    );
};

export default ArticlesPage;
