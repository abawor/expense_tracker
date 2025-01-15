import { useQuery } from "@apollo/client";
import { GET_TRANSACTIONS } from "../graphql/queries/transaction.query";
import { GET_AUTHENTICATED_USER, GET_USER_AND_TRANSACTIONS } from "../graphql/queries/user.query";
import Card from "./Card";

const Cards = () => {
	const { data, loading } = useQuery(GET_TRANSACTIONS);
	const { data: authUser } = useQuery(GET_AUTHENTICATED_USER);

	const { data: userAndTransactions } = useQuery(GET_USER_AND_TRANSACTIONS, {
		variables: {
			userId: authUser?.authUser?._id
		}
	});

	return (
		<div className='w-full px-10 min-h-[40vh]'>
			<p className='text-5xl font-bold text-center my-10'>History</p>
			<div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-start mb-20'>
				{!loading && data.transactions.map(transaction => (
					<Card
						key={transaction._id}
						transaction={transaction}
						authUser={authUser.authUser}
					/>
				))}
				{!loading && data.transactions.length === 0 && (
					<p className='text-center text-white text-xl'>No transaction history available</p>
				)}
			</div>
		</div>
	);
};

export default Cards;
