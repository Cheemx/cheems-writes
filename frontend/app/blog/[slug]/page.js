export default async function Blog({ params }) {
    const { slug } = await params
    return <div>My Post: {slug}</div>
}