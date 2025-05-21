export default async function DailyBlog({ params }) {
    const { slug } = await params
    return <div>My Post: {slug}</div>
}