# States:
# (1)     (2)
#  _  e   e  _
# | | |   | | |
# | |_|   |_| |
# s           s

# (3)     (4)
#  _  s   s  _
# | | |   | | |
# | |_|   |_| |
# e           e

# mealy automaton. 
# takes as input the current state and a point in a 3x3 grid
# outputs (new_state, mealy_output)
def automaton (state, input):
    if state == 1:
        if input == (0,0):
            return (1, '2')
        elif input == (0,1):
            return (4, '3')
        elif input == (0,2):
            return (1, '8')
        elif input == (1,0):
            return (2, '1')
        elif input == (1,1):
            return (3, '4')
        elif input == (1,2):
            return (2, '7')
        elif input == (2,0):
            return (1, '0')
        elif input == (2,1):
            return (4, '5')
        elif input == (2,2):
            return (1, '6')
    elif state == 2:
        if input == (0,0):
            return (2, '8')
        elif input == (0,1):
            return (3, '3')
        elif input == (0,2):
            return (2, '2')
        elif input == (1,0):
            return (1, '7')
        elif input == (1,1):
            return (4, '4')
        elif input == (1,2):
            return (1, '1')
        elif input == (2,0):
            return (2, '6')
        elif input == (2,1):
            return (3, '5')
        elif input == (2,2):
            return (2, '0')
    elif state == 3:
        if input == (0,0):
            return (3, '6')
        elif input == (0,1):
            return (2, '5')
        elif input == (0,2):
            return (3, '0')
        elif input == (1,0):
            return (4, '7')
        elif input == (1,1):
            return (1, '4')
        elif input == (1,2):
            return (4, '1')
        elif input == (2,0):
            return (3, '8')
        elif input == (2,1):
            return (2, '3')
        elif input == (2,2):
            return (3, '2')
    elif state == 4:
        if input == (0,0):
            return (4, '0')
        elif input == (0,1):
            return (1, '5')
        elif input == (0,2):
            return (4, '6')
        elif input == (1,0):
            return (3, '1')
        elif input == (1,1):
            return (2, '4')
        elif input == (1,2):
            return (3, '7')
        elif input == (2,0):
            return (4, '2')
        elif input == (2,1):
            return (1, '3')
        elif input == (2,2):
            return (4, '8')

def str_to_int(str, size):
    n = 0
    for i in range(size):
        n = n + (int(str[len(str)-1-i]) * (9**i))

    return n

def peano_automaton(size):
    prev_state = [[1]]
    prev_peano = [['']]
    idx = {i: i for i in range((3**size)**2)}

    for n in range(1, size+1):
        current_peano = [['' for i in range(3**n)] for j in range(3**n)]
        current_state = [[0 for i in range(3**n)] for j in range(3**n)]

        for i in range(3**n):
            for j in range(3**n):
                output_automaton = automaton(prev_state[i//3][j//3], (i%3,j%3))
                current_peano[i][j] = prev_peano[i//3][j//3] + output_automaton[1]
                current_state[i][j] = output_automaton[0]
        prev_peano = current_peano
        prev_state = current_state

    for i in range(3**x):
        for j in range(3**x):
            idx[str_to_int(prev_peano[i][j], x)] = ((i,j), prev_state[i][j])

    return idx

def output_to_word(idx):
    curr_col = idx[0][0][1]
    curr_row = idx[0][0][0]
    s = ""

    for i in range(1, (3**x)**2):
        if idx[i][0] == (curr_row, curr_col+1):
            s = s + 'r'
            curr_col += 1
        elif idx[i][0] == (curr_row, curr_col-1):
            s = s + 'l'
            curr_col -= 1
        elif idx[i][0] == (curr_row+1, curr_col):
            s = s + 'd'
            curr_row += 1
        elif idx[i][0] == (curr_row-1, curr_col):
            s = s + 'u'
            curr_row -= 1

    return s

def h1(s):
    s1 = ""
    for i in s:
        if i == 'u':
            s1 += "u"
        elif i == 'd':
            s1 += "d"
        elif i == "l":
            s1 += "r"
        elif i == "r":
            s1 += "l"
    return s1

def h2(s):
    s1 = ""
    for i in s:
        if i == 'u':
            s1 += "d"
        elif i == 'd':
            s1 += "u"
        elif i == "l":
            s1 += "l"
        elif i == "r":
            s1 += "r"
    return s1

def h3(s):
    s1 = ""
    for i in s:
        if i == 'u':
            s1 += "d"
        elif i == 'd':
            s1 += "u"
        elif i == "l":
            s1 += "r"
        elif i == "r":
            s1 += "l"
    return s1

def P(n):
    if n == 1:
        return "uurddruu"
    else:
        prev = P(n-1)
        return prev + "u" + h1(prev) + "u" + prev + "r" + h2(prev) + "d" + h3(prev) + "d" + h2(prev) + "r" + prev + "u" + h1(prev) + "u" + prev

x = 1
while (True):
    peano_words = P(x)
    automaton_words = output_to_word(peano_automaton(x))
    print("n =", x, ":", peano_words == automaton_words)
    x += 1