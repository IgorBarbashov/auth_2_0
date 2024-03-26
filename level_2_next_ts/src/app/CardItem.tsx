import Link from 'next/link';

interface ICardItem {
    title: string;
    content: string;
}

export function CardItem({ content, title }: ICardItem) {
    return (
        <div className='mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left'>
            <Link
                href='/login'
                className='group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30'
            >
                <h2 className={`mb-3 text-2xl font-semibold`}>{title}</h2>
                <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>{content}</p>
            </Link>
        </div>
    );
}