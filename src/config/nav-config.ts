import { NavGroup } from '@/types';

export const navGroups: NavGroup[] = [
  {
    label: 'KMS',
    items: [
      {
        title: 'Knowledge Base',
        url: '/dashboard/kms',
        icon: 'book',
        isActive: true,
        items: [
          {
            title: 'Dashboard',
            url: '/dashboard/kms',
            icon: 'dashboard'
          },
          {
            title: 'Repository',
            url: '/dashboard/kms/repository',
            icon: 'fileText'
          },
          {
            title: 'Tacit Map',
            url: '/dashboard/kms/map',
            icon: 'map'
          },
          {
            title: 'Weekly Pro Tips',
            url: '/dashboard/kms/pro-tips',
            icon: 'play'
          },
          {
            title: 'Lessons Learned',
            url: '/dashboard/kms/lessons',
            icon: 'book'
          },
          {
            title: 'Expert Locator',
            url: '/dashboard/kms/experts',
            icon: 'users'
          },
          {
            title: 'Landmark Tagging',
            url: '/dashboard/kms/landmarks',
            icon: 'location'
          },
          {
            title: 'Exit Knowledge',
            url: '/dashboard/kms/exit-knowledge',
            icon: 'logout'
          }
        ]
      }
    ]
  }
];
