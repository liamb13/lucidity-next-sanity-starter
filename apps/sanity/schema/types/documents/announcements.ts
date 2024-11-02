import { HiSpeakerphone } from 'react-icons/hi';
import { defineField, defineType } from 'sanity';
import { validPostTimestamps } from '@pkg/sanity-toolkit/studio/schema/validation';

interface Prepare {
  title?: string;
  isActive?: boolean;
  startDate?: string;
  endDate?: string;
}

export const announcements = defineType({
  name: 'announcement',
  title: 'Announcement Bar',
  type: 'document',
  icon: HiSpeakerphone,
  fields: [
    defineField({
      name: 'message',
      title: 'Announcement Message',
      type: 'string',
      validation: (Rule) =>
        Rule.required()
          .max(160)
          .warning(
            'Announcements work best when they are concise—consider reduced the length of the announcement message.',
          ),
    }),
    defineField({
      name: 'startDate',
      title: 'Start Date & Time',
      type: 'datetime',
      description: 'When should this announcement start showing?',
      options: {
        timeFormat: 'HH:mm',
      },
    }),
    defineField({
      name: 'endDate',
      title: 'End Date & Time',
      type: 'datetime',
      description: 'When should this announcement stop showing?',
      options: {
        timeFormat: 'HH:mm',
      },
      validation: (rule) =>
        rule
          .custom(
            validPostTimestamps('startDate', 'before', undefined, 'Start Date', 'End Date'),
          )
          .error(),
    }),
  ],
  preview: {
    select: {
      title: 'message',
      isActive: 'isActive',
      startDate: 'startDate',
      endDate: 'endDate',
    },
    prepare({ title, isActive, startDate, endDate }: Prepare) {
      const status = isActive ? '🟢 Active' : '⚫ Inactive';
      const dateRange = formatDateRange(startDate, endDate);

      return {
        title: title ?? '[No message set]',
        subtitle: `${status}${dateRange ? ` • ${dateRange}` : ''}`,
      };
    },
  },
});

function formatDateRange(startDate?: string, endDate?: string): string {
  if (!startDate && !endDate) return '';

  const formatDate = (date: string) => new Date(date).toLocaleDateString();

  const parts = [
    startDate && `Starts: ${formatDate(startDate)}`,
    endDate && `Ends: ${formatDate(endDate)}`,
  ].filter(Boolean);

  return parts.join(' • ');
}
