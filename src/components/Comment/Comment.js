import { format, parseISO } from 'date-fns';

import css from './Comment.module.css';

const Comment = ({item}) => {
    const {comment, createdAt} = item;

    return(
        <div className={css.comment}>
            <p>{comment}</p>
            <p>{format(parseISO(createdAt), 'd MMM yyyy')}</p>
        </div>
    );
};

export {
    Comment
};