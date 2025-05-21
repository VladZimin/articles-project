import { useParams } from 'react-router-dom';
import { ArticleDetails } from '@/entities/Article';
import { Card } from '@/shared/ui/redesigned';

interface DetailsContainerProps {
    className?: string
}

export const DetailsContainer = ({ className }:DetailsContainerProps) => {
    const { id } = useParams<{id: string }>();

    return (
        <Card border="round" className={className} padding="24" max>
            <ArticleDetails id={id!} />
        </Card>
    );
};
