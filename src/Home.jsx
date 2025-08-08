import React, { useMemo, useState } from 'react';
import Card from './Card';
import setsData from './assets/shadow_fight_2_best_sets.json';
import './Home.css';

function Select({ label, value, onChange, options, name }) {
    return (
        <label className="sf-filter">
            <span className="sf-filter__label">{label}</span>
            <select name={name} value={value} onChange={e => onChange(e.target.value)} className="sf-filter__select">
                <option value="ALL">All</option>
                {options.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
        </label>
    );
}

function Home() {
    const [grind, setGrind] = useState('ALL');
    const [skill, setSkill] = useState('ALL');
    const [fun, setFun] = useState('ALL');
    const [focus, setFocus] = useState('ALL');
    const [search, setSearch] = useState('');

    const filterOptions = useMemo(() => {
        const f = setsData.filters;
        return {
            grind: Object.keys(f.willingness_to_grind),
            skill: Object.keys(f.skill_level),
            fun: Object.keys(f.fun_factor),
            focus: Object.keys(f.gameplay_focus)
        };
    }, []);

    const filteredSets = useMemo(() => {
        return setsData.sets.filter((set) => {
            if (grind !== 'ALL' && set.criteria.willingness_to_grind !== grind) return false;
            if (skill !== 'ALL' && set.criteria.skill_level !== skill) return false;
            if (fun !== 'ALL' && set.criteria.fun_factor !== fun) return false;
            if (focus !== 'ALL' && set.criteria.gameplay_focus !== focus) return false;
            if (search && !set.name.toLowerCase().includes(search.toLowerCase())) return false;
            return true;
        });
    }, [grind, skill, fun, focus, search]);

    const reset = () => { setGrind('ALL'); setSkill('ALL'); setFun('ALL'); setFocus('ALL'); setSearch(''); };

        return (
                <div className="sf-page">
                    <div className="sf-container">
                        <header className="sf-page__header">
                <h1 className="sf-page__title">Shadow Fight 2 – Best Sets</h1>
                <p className="sf-page__subtitle">Filter by grind, skill, fun & gameplay focus to find the set that fits your journey.</p>
            </header>
            <section className="sf-filters" aria-label="Filters">
                <div className="sf-filters__row">
                    <Select label="Grind" value={grind} onChange={setGrind} options={filterOptions.grind} name="grind" />
                    <Select label="Skill" value={skill} onChange={setSkill} options={filterOptions.skill} name="skill" />
                    <Select label="Fun" value={fun} onChange={setFun} options={filterOptions.fun} name="fun" />
                    <Select label="Focus" value={focus} onChange={setFocus} options={filterOptions.focus} name="focus" />
                    <label className="sf-filter sf-filter--search">
                        <span className="sf-filter__label">Search</span>
                        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Type name..." className="sf-filter__select sf-filter__input" />
                    </label>
                </div>
                <div className="sf-filters__actions">
                    <button onClick={reset} className="sf-btn sf-btn--ghost" type="button">Reset</button>
                    <div className="sf-result-count">{filteredSets.length} / {setsData.sets.length} sets</div>
                </div>
            </section>
                        <main className="sf-grid" aria-live="polite">
                {filteredSets.length === 0 && (
                    <div className="sf-empty">No sets match your filters. Adjust criteria.</div>
                )}
                {filteredSets.map((set, idx) => (
                    <Card key={set.name + idx} set={set} />
                ))}
            </main>
                        <footer className="sf-page__footer">Data curated from in‑game events & community knowledge. UI themed for immersion.</footer>
                    </div>
        </div>
    );
}

export default Home;