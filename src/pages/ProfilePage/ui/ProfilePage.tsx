import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Page } from '@/widgets/Page';
import { EditableProfileCard } from '@/features/EditableProfileCard';

interface ProfilePageProps {
    className?: string
}

const ProfilePage = memo(({ className }:ProfilePageProps) => {
    return (
        <Page className={classNames('', {}, [className])}>
            <EditableProfileCard />
        </Page>
    );
});

export default ProfilePage;
