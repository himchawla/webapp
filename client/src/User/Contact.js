
export function Contact() {
    
    return (
        <div className="CV">
            <main className="page hire-me-page">
                <section className="portfolio-block hire-me">
                    <div className="container">
                        <div className="heading">
                            <h2>Contact</h2>
                        </div>
                        <form>
                            <div className="mb-3"><label className="form-label" htmlFor="subject">Subject</label><select
                                className="form-select" id="subject">
                                <optgroup label="This is a group">
                                    <option value="12" selected="">This is item 1</option>
                                    <option value="13">This is item 2</option>
                                    <option value="14">This is item 3</option>
                                </optgroup>
                            </select></div>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="email">Email</label>
                                <input className="form-control" type="email" id="email"/>
                            </div>
                            <div className="mb-3">
                                <label className="form-label" htmlFor="message">Message</label>
                                <textarea className="form-control" id="message"></textarea>
                            </div>
                            <div className="mb-3">
                                <div className="row">
                                    <div className="col-md-6"><label className="form-label"
                                                                     htmlFor="hire-date">Date</label>
                                        <input className="form-control" id="hire-date" type="date"/>
                                    </div>
                                    <div className="col-md-6 button">
                                        <button className="btn btn-primary d-block w-100" type="submit">Hire Me</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </section>
            </main>
        </div>
    );
}