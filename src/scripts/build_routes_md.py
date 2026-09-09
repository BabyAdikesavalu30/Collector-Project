import os
import re

param_regex = re.compile(r'useLocalSearchParams<([^>]+)>')

routes_info = []

for root, dirs, files in os.walk('app'):
    for f in sorted(files):
        if f.endswith('.tsx') and not f.startswith('_'):
            filepath = os.path.join(root, f)
            rel = os.path.relpath(filepath, 'app')
            route = '/' + rel[:-4].replace('index', '')
            if route.endswith('/') and len(route) > 1:
                route = route[:-1]
            
            with open(filepath, 'r', encoding='utf-8') as src:
                content = src.read()
            
            # extract params
            m = param_regex.search(content)
            params = 'None'
            if m:
                p_text = m.group(1).replace('\n', ' ').strip()
                p_text = re.sub(r'\s+', ' ', p_text)
                params = p_text[:40]
            elif '[id]' in route:
                params = 'id: string'
            elif '[subject]' in route:
                params = 'subject: string'
            
            # extract purpose
            purpose = f'{route} screen'
            comment_match = re.search(r'/\*\*\s*\n\s*\*\s*(.*?)\n', content)
            if comment_match:
                purpose = comment_match.group(1).strip()

            # back behavior
            back = 'router.back() / fallback'
            if 'canGoBack()' in content:
                back = 'canGoBack() ? back() : fallback'
            elif 'router.replace(' in content:
                back = 'router.replace(...)'
            
            # data dependency
            deps = []
            if 'storage' in content or 'STORAGE_KEYS' in content:
                deps.append('AsyncStorage')
            if 'service' in content or 'Repository' in content:
                deps.append('DomainService')
            if 'Language' in content:
                deps.append('LanguageContext')
            dep_str = ', '.join(deps) if deps else 'Static UI'

            routes_info.append((route, rel, purpose, params, back, dep_str))

routes_info.sort(key=lambda x: x[0])

with open('ROUTES.md', 'w', encoding='utf-8') as out:
    out.write('# Vigyaan / VigyaanXpo — Complete Route Matrix (98 Route Files)\n\n')
    out.write('Expo Router file-based routing under `app/` (98 route files). All screens render inside a single global shell (`app/_layout.tsx` -> `src/components/navigation/AppShell.tsx`) that owns the canonical 4-tab bottom navigation (Home · Learn · Games · Profile).\n\n')
    out.write('| Route Path | Source File | Purpose | Parameters | Back Behavior | Data Dependencies |\n')
    out.write('| :--- | :--- | :--- | :--- | :--- | :--- |\n')
    for r, rel, p, par, b, d in routes_info:
        p_clean = p.replace('|', '/')
        par_clean = par.replace('|', '/')
        out.write(f'| `{r}` | `app/{rel}` | {p_clean} | `{par_clean}` | {b} | {d} |\n')
    
    out.write('\n---\n\n## Root Shell & Navigation Rules\n\n')
    out.write('1. **Root Layout**: `app/_layout.tsx` mounts `SafeAreaProvider`, `LanguageProvider`, and `AppShell`.\n')
    out.write('2. **Centralized Tab Mapping**: Defined in `src/components/navigation/navigation.config.ts`.\n')
    out.write('3. **Canonical Back Control**: Every child header mounts `<AppBackButton />` enforcing a >=44x44 touch target and bilingual TalkBack / VoiceOver labeling.\n')

print(f'Successfully generated matrix for {len(routes_info)} routes in ROUTES.md')
