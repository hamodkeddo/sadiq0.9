import './Page.css'

const MEMBERS = [
  { name: 'Abed Keddo', role: 'President', photo: '/images/boardMembers/abed-keddo.jpg' },
  { name: 'Dr. Huda Aljord', role: 'Vice President', photo: '/images/boardMembers/huda-aljord.jpg' },
  { name: 'Dr. Anas Kayal, MD', role: 'Chief Financial Officer', photo: '/images/boardMembers/anas-kayal.jpg' },
  { name: 'Abdulrahman Alghazouli', role: 'Communications', photo: '/images/boardMembers/abdulrahman-alghazouli.jpg' },
  { name: 'Mahmoud Alagha', role: 'Social Director', photo: '/images/boardMembers/mahmoud-alagha.jpg' },
  { name: 'Dr. Bashar Ahmedo', role: 'Board Member', photo: '/images/boardMembers/bashar-ahmedo.jpg' },
  { name: 'Ahmad Zadah', role: 'Board Member', photo: '/images/boardMembers/ahmad-zadah.jpg' },
  { name: 'Aosama Utlebe', role: 'Board Member', photo: '/images/boardMembers/aosama-utlebe.jpg' },
] as const

export default function Board() {
  return (
    <>
      <section className="page-hero">
        <div className="page-hero__inner">
          <span className="page-hero__eyebrow">Leadership</span>
          <h1>Board members</h1>
          <p className="lead">
            Meet the dedicated professionals guiding our mission—committed to transparency,
            accountability, and impact for Syrian communities at home and abroad.
          </p>
        </div>
      </section>
      <div className="page">
        <div className="board-grid">
          {MEMBERS.map((m) => (
            <article key={m.name} className="board-card">
              <div className="board-card__photo">
                <img src={m.photo} alt="" width={400} height={300} loading="lazy" decoding="async" />
              </div>
              <div className="board-card__body">
                <h2 className="board-card__name">{m.name}</h2>
                <p className="board-card__role">{m.role}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </>
  )
}
