import csv

def generate_career_details(csv_path):
    careers = []
    with open(csv_path, newline='', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            career = row['Career'].strip()
            if career not in careers:
                careers.append(career)

    # Template for each career
    template = """
    "{career}": {{
        description: "A brief description of what a {career} does.",
        education: "Typical education requirements (e.g., Bachelor's degree in relevant field).",
        duration: "Approximate time to qualify (e.g., 4 years).",
        salary: "Entry-level to experienced salary range (e.g., $50,000 - $90,000).",
        skills: "Key skills (e.g., communication, problem-solving, technical skills).",
        outlook: "Job growth outlook (e.g., Growing demand, steady, etc.)."
    }},"""

    output = "const careerDetails = {\n"
    for career in careers:
        output += template.format(career=career)
    output += "\n};"

    with open('career_details.js', 'w', encoding='utf-8') as out:
        out.write(output)

    print(f"✅ Generated {len(careers)} career entries. Saved to career_details.js")

if __name__ == '__main__':
    generate_career_details('career_data.csv')