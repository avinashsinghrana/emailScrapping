import {Message} from '../components/model/Message';


export function mailSorting(messages: Message[], searchTerm: string): Message[] {
    if (!messages || !searchTerm) {
      return messages;
    }
    return messages.filter(message =>
      message.subject.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
    );
}
